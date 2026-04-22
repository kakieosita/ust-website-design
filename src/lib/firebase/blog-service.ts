import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
// Firebase storage imports removed in favor of Cloudinary
import { db, storage } from "./config";
import { BlogPost } from "@/lib/blog-data";

const COLLECTION = "blog_posts";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const calcReadTime = (html: string) => {
  const words = html.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

// ─── Cloudinary Image Upload ──────────────────────────────────────────────────
export const uploadFeaturedImage = async (file: File, postSlug: string): Promise<string> => {
  // IMPORTANT: Replace these with your actual Cloudinary credentials
  const CLOUD_NAME = "dwba1ih5c"; 
  const UPLOAD_PRESET = "ust_blog_uploads"; 


  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Failed to upload image to Cloudinary");
  }

  const data = await response.json();
  return data.secure_url;
};

export const deleteFeaturedImage = async (url: string) => {
  // Cloudinary unsigned API does not support deletion from the frontend for security reasons.
  // Images can be deleted manually via the Cloudinary dashboard or using a signed server-side request.
  console.log("Image delete requested for (unsupported from frontend):", url);
};

// ─── Public API ───────────────────────────────────────────────────────────────

/** Get all PUBLISHED posts, newest first */
export const getPublishedPosts = async (): Promise<BlogPost[]> => {
  try {
    const q = query(
      collection(db, COLLECTION),
      where("status", "==", "published"),
      orderBy("publishedAt", "desc")
    );
    const snap = await getDocs(q);
    
    // Process results to handle legacy field names
    return snap.docs.map((d) => {
      const data = d.data();
      return { 
        id: d.id, 
        ...data,
        image: data.image || data.featuredImage || "", // Unify image field
      } as BlogPost;
    });
  } catch (error: any) {
    console.error("DEBUG: blog-service getPublishedPosts error:", error);
    // If orderBy fails (missing index), fallback to a basic query and sort manually
    const qBasic = query(collection(db, COLLECTION), where("status", "==", "published"));
    const snap = await getDocs(qBasic);
    const posts = snap.docs.map((d) => {
        const data = d.data();
        return { id: d.id, ...data, image: data.image || data.featuredImage || "" } as BlogPost;
    });
    return posts.sort((a, b) => 
        new Date(b.publishedAt || b.createdAt || 0).getTime() - 
        new Date(a.publishedAt || a.createdAt || 0).getTime()
    );
  }
};

/** Get single post by slug */
export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const q = query(collection(db, COLLECTION), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as BlogPost;
};

/** Get published posts filtered by a tag */
export const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
  const q = query(
    collection(db, COLLECTION),
    where("status", "==", "published"),
    where("tags", "array-contains", tag),
    orderBy("publishedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
};

// ─── Admin API ────────────────────────────────────────────────────────────────

/** Get ALL posts (draft + published) for admin */
export const getAllPosts = async (): Promise<BlogPost[]> => {
  try {
    const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
  } catch (error: any) {
    console.error("DEBUG: blog-service getAllPosts error:", error);
    throw error;
  }
};

/** Create a new post */
export const createPost = async (
  data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">
): Promise<BlogPost> => {
  try {
    const now = new Date().toISOString();
    const payload = {
      ...data,
      slug: data.slug || slugify(data.title),
      readTime: calcReadTime(data.content),
      tag: data.tags?.[0] || "",          // primary tag kept for compat
      createdAt: now,
      updatedAt: now,
      publishedAt: data.status === "published" ? now : data.publishedAt || null,
    };
    const docRef = await addDoc(collection(db, COLLECTION), payload);
    return { id: docRef.id, ...payload } as BlogPost;
  } catch (error: any) {
    console.error("DEBUG: blog-service createPost error:", error);
    throw error;
  }
};

/** Update an existing post */
export const updatePost = async (
  id: string,
  data: Partial<BlogPost>
): Promise<void> => {
  const now = new Date().toISOString();
  const docRef = doc(db, COLLECTION, id);
  const snap = await getDoc(docRef);
  const existing = snap.data() as BlogPost;

  const nowPublished = data.status === "published" || existing.status === "published";
    
  await updateDoc(docRef, {
    ...data,
    slug: data.slug || slugify(data.title || existing.title),
    readTime: calcReadTime(data.content || existing.content || ""),
    tag: (data.tags ?? existing.tags)?.[0] || "",
    updatedAt: now,
    // Ensure publishedAt is NEVER null if it is published
    publishedAt:
      nowPublished && !existing.publishedAt
        ? now
        : (data.publishedAt ?? existing.publishedAt ?? (nowPublished ? now : null)),
  });
};

/** Delete a post */
export const deletePost = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTION, id));
};

/** Toggle publish/draft status */
export const togglePostStatus = async (
  id: string,
  currentStatus: "draft" | "published"
): Promise<void> => {
  const newStatus = currentStatus === "published" ? "draft" : "published";
  const now = new Date().toISOString();
  await updateDoc(doc(db, COLLECTION, id), {
    status: newStatus,
    updatedAt: now,
    ...(newStatus === "published" ? { publishedAt: now } : {}),
  });
};
