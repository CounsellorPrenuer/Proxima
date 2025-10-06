import { type User, type InsertUser, type Consultation, type InsertConsultation, type Booking, type InsertBooking, type Payment, type InsertPayment, type Testimonial, type InsertTestimonial, type BlogArticle, type InsertBlogArticle } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Consultation methods
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  getConsultations(): Promise<Consultation[]>;
  getConsultation(id: string): Promise<Consultation | undefined>;

  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  updateBooking(id: string, data: Partial<Booking>): Promise<Booking>;

  // Payment methods
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPayment(id: string): Promise<Payment | undefined>;
  getPaymentByOrderId(orderId: string): Promise<Payment | undefined>;
  updatePayment(id: string, data: Partial<Payment>): Promise<Payment>;

  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Blog methods
  getBlogArticles(): Promise<BlogArticle[]>;
  getBlogArticle(id: string): Promise<BlogArticle | undefined>;
  createBlogArticle(article: InsertBlogArticle): Promise<BlogArticle>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private consultations: Map<string, Consultation>;
  private bookings: Map<string, Booking>;
  private payments: Map<string, Payment>;
  private testimonials: Map<string, Testimonial>;
  private blogArticles: Map<string, BlogArticle>;

  constructor() {
    this.users = new Map();
    this.consultations = new Map();
    this.bookings = new Map();
    this.payments = new Map();
    this.testimonials = new Map();
    this.blogArticles = new Map();

    this.seedData();
  }

  private seedData() {
    const testimonial1: Testimonial = {
      id: randomUUID(),
      name: "Priya Sharma",
      role: "Parent of Class 12 Student",
      content: "Ashu's guidance helped my daughter choose the right career path. The Mentoria assessment was eye-opening, and the counselling sessions were incredibly insightful. Today, she's pursuing her dream of becoming a software engineer!",
      rating: 5,
      imageUrl: null,
      isPublished: true,
      createdAt: new Date(),
    };

    const testimonial2: Testimonial = {
      id: randomUUID(),
      name: "Rajesh Kumar",
      role: "Class 11 Student",
      content: "I was confused about my career options after 10th. PROXIMA's career counselling with Mentoria helped me discover my strengths and interests. Now I'm confident about my future in engineering.",
      rating: 5,
      imageUrl: null,
      isPublished: true,
      createdAt: new Date(),
    };

    const testimonial3: Testimonial = {
      id: randomUUID(),
      name: "Dr. Anjali Verma",
      role: "School Principal",
      content: "PROXIMA's workshops on cyber hygiene and emotional intelligence have been transformative for our students and teachers. Ashu's expertise and engaging delivery make complex topics accessible to everyone.",
      rating: 5,
      imageUrl: null,
      isPublished: true,
      createdAt: new Date(),
    };

    this.testimonials.set(testimonial1.id, testimonial1);
    this.testimonials.set(testimonial2.id, testimonial2);
    this.testimonials.set(testimonial3.id, testimonial3);

    const article1: BlogArticle = {
      id: randomUUID(),
      title: "Navigating the Digital World: A Cyber Hygiene Guide for Families",
      slug: "cyber-hygiene-guide-families",
      excerpt: "Learn essential digital safety practices to protect your family online. From password management to recognizing phishing attempts, this comprehensive guide covers everything you need to know.",
      content: "Full article content...",
      category: "Cyber Security",
      imageUrl: null,
      author: "Ashu Manchanda",
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const article2: BlogArticle = {
      id: randomUUID(),
      title: "The Parent's Role in Adolescent Mental Health",
      slug: "parent-role-adolescent-mental-health",
      excerpt: "Understanding and supporting your teenager's emotional well-being. Discover practical strategies for open communication, recognizing warning signs, and fostering resilience.",
      content: "Full article content...",
      category: "Mental Health",
      imageUrl: null,
      author: "Ashu Manchanda",
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const article3: BlogArticle = {
      id: randomUUID(),
      title: "Unlocking Potential: Strategies for Supporting Students with Special Needs",
      slug: "supporting-students-special-needs",
      excerpt: "Evidence-based approaches for creating inclusive learning environments. Learn how to adapt teaching methods and leverage specialized resources for diverse learners.",
      content: "Full article content...",
      category: "Special Education",
      imageUrl: null,
      author: "Ashu Manchanda",
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const article4: BlogArticle = {
      id: randomUUID(),
      title: "Choosing Your Career Path: A Guide for Modern Students",
      slug: "choosing-career-path-modern-students",
      excerpt: "Navigate the complex world of career choices with confidence. Explore how psychometric assessments, self-reflection, and expert guidance can help you find your ideal profession.",
      content: "Full article content...",
      category: "Career Guidance",
      imageUrl: null,
      author: "Ashu Manchanda",
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.blogArticles.set(article1.id, article1);
    this.blogArticles.set(article2.id, article2);
    this.blogArticles.set(article3.id, article3);
    this.blogArticles.set(article4.id, article4);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Consultation methods
  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const id = randomUUID();
    const consultation: Consultation = {
      ...insertConsultation,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.consultations.set(id, consultation);
    return consultation;
  }

  async getConsultations(): Promise<Consultation[]> {
    return Array.from(this.consultations.values());
  }

  async getConsultation(id: string): Promise<Consultation | undefined> {
    return this.consultations.get(id);
  }

  // Booking methods
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = {
      ...insertBooking,
      id,
      status: "pending",
      paymentId: null,
      orderId: null,
      createdAt: new Date(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async updateBooking(id: string, data: Partial<Booking>): Promise<Booking> {
    const booking = this.bookings.get(id);
    if (!booking) throw new Error("Booking not found");
    const updated = { ...booking, ...data };
    this.bookings.set(id, updated);
    return updated;
  }

  // Payment methods
  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = randomUUID();
    const payment: Payment = {
      ...insertPayment,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.payments.set(id, payment);
    return payment;
  }

  async getPayment(id: string): Promise<Payment | undefined> {
    return this.payments.get(id);
  }

  async getPaymentByOrderId(orderId: string): Promise<Payment | undefined> {
    return Array.from(this.payments.values()).find(
      (payment) => payment.razorpayOrderId === orderId,
    );
  }

  async updatePayment(id: string, data: Partial<Payment>): Promise<Payment> {
    const payment = this.payments.get(id);
    if (!payment) throw new Error("Payment not found");
    const updated = { ...payment, ...data, updatedAt: new Date() };
    this.payments.set(id, updated);
    return updated;
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = {
      ...insertTestimonial,
      id,
      createdAt: new Date(),
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Blog methods
  async getBlogArticles(): Promise<BlogArticle[]> {
    return Array.from(this.blogArticles.values());
  }

  async getBlogArticle(id: string): Promise<BlogArticle | undefined> {
    return this.blogArticles.get(id);
  }

  async createBlogArticle(insertArticle: InsertBlogArticle): Promise<BlogArticle> {
    const id = randomUUID();
    const article: BlogArticle = {
      ...insertArticle,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.blogArticles.set(id, article);
    return article;
  }
}

export const storage = new MemStorage();
