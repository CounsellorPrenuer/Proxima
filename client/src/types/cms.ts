export interface SanityImage {
  _type: "image";
  asset?: { _ref: string };
}

export interface StandardPlan {
  _id: string;
  planId: string;
  title: string;
  subgroup: "8-10" | "10-12" | "college" | "working";
  price: number;
  features: string[];
  sortOrder?: number;
}

export interface CustomPlan {
  _id: string;
  planId: string;
  title: string;
  price: number;
  description: string;
  sortOrder?: number;
}

export interface ServiceItem {
  _id: string;
  title: string;
  description: string;
  image?: SanityImage;
}

export interface TestimonialItem {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: SanityImage;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category?: string;
  publishedAt: string;
  image?: SanityImage;
}
