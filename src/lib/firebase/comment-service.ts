import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { db } from "./config";

const COLLECTION = "comments";

export interface Comment {
  id?: string;
  postId: string;
  author: string;
  content: string;
  createdAt: any; // Firestore Timestamp
}

export const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
  try {
    const q = query(
      collection(db, COLLECTION),
      where("postId", "==", postId),
      orderBy("createdAt", "desc")
    );
    
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Comment[];
  } catch (error: any) {
    console.error("Error fetching comments:", error);
    // If index is missing, fallback to filtering in memory
    if (error.code === 'failed-precondition') {
       const qBasic = query(collection(db, COLLECTION), where("postId", "==", postId));
       const snap = await getDocs(qBasic);
       return snap.docs.map(doc => ({
         id: doc.id,
         ...doc.data()
       })).sort((a: any, b: any) => b.createdAt?.seconds - a.createdAt?.seconds) as Comment[];
    }
    return [];
  }
};

export const addComment = async (postId: string, author: string, content: string): Promise<Comment> => {
  const newComment = {
    postId,
    author,
    content,
    createdAt: serverTimestamp(),
  };
  
  const docRef = await addDoc(collection(db, COLLECTION), newComment);
  return { id: docRef.id, ...newComment, createdAt: Timestamp.now() } as Comment;
};
