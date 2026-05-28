import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
} from "@/lib/config";
import type {
  BlogPost,
  CustomPlan,
  SanityImage,
  ServiceItem,
  StandardPlan,
  TestimonialItem,
} from "@/types/cms";

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
});

const imageBuilder = imageUrlBuilder(sanityClient);

export function sanityImageUrl(image?: SanityImage): string {
  if (!image?.asset?._ref) return "";
  return imageBuilder.image(image).width(1200).auto("format").url();
}

export async function fetchStandardPlans(): Promise<StandardPlan[]> {
  return sanityClient.fetch(
    `*[_type == "standardPlan"] | order(sortOrder asc, _createdAt asc){
      _id, planId, title, subgroup, price, features, sortOrder
    }`,
  );
}

export async function fetchCustomPlans(): Promise<CustomPlan[]> {
  return sanityClient.fetch(
    `*[_type == "customPlan"] | order(sortOrder asc, _createdAt asc){
      _id, planId, title, price, description, sortOrder
    }`,
  );
}

export async function fetchServices(): Promise<ServiceItem[]> {
  return sanityClient.fetch(
    `*[_type == "services"] | order(_createdAt desc){
      _id, title, description, image
    }`,
  );
}

export async function fetchTestimonials(): Promise<TestimonialItem[]> {
  return sanityClient.fetch(
    `*[_type == "testimonials"] | order(_createdAt desc){
      _id, name, role, content, rating, image
    }`,
  );
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc, _createdAt desc){
      _id, title, "slug": slug.current, excerpt, content, category, publishedAt, image
    }`,
  );
}
