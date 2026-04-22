export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'student';
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string; // Rich Text / Markdown
  featuredImage: string;
  authorId: string;
  status: 'draft' | 'published';
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface PageSection {
  id: string;
  type: string;
  data: any;
}

export interface Page {
  id: string;
  name: string; // home, about, programs, etc.
  sections: PageSection[];
  lastUpdated: string;
}

export interface Program {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  price: string;
  deliveryMode: 'On-campus' | 'Online' | 'Hybrid';
  featuredImage: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
}

export interface Media {
  id: string;
  fileUrl: string;
  type: 'image' | 'video' | 'document';
  uploadedAt: string;
}
