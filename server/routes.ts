import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConsultationSchema, insertBookingSchema, SERVICE_PRICING } from "@shared/schema";
import Razorpay from "razorpay";
import crypto from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "",
  });

  // Consultation endpoints
  app.post("/api/consultations", async (req, res) => {
    try {
      const validatedData = insertConsultationSchema.parse(req.body);
      const consultation = await storage.createConsultation(validatedData);
      res.json(consultation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/consultations", async (req, res) => {
    try {
      const consultations = await storage.getConsultations();
      res.json(consultations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Payment endpoints
  app.post("/api/payments/create-order", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      
      const amount = SERVICE_PRICING[validatedData.serviceType as keyof typeof SERVICE_PRICING];
      if (!amount) {
        return res.status(400).json({ error: "Invalid service type" });
      }

      const booking = await storage.createBooking(validatedData);

      const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_${booking.id}`,
      });

      const payment = await storage.createPayment({
        bookingId: booking.id,
        razorpayOrderId: order.id,
        razorpayPaymentId: null,
        razorpaySignature: null,
        amount: amount,
        currency: "INR",
        status: "created",
      });

      await storage.updateBooking(booking.id, {
        orderId: order.id,
      });

      res.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        bookingId: booking.id,
        paymentId: payment.id,
      });
    } catch (error: any) {
      console.error("Create order error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/payments/verify", async (req, res) => {
    try {
      const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId } = req.body;

      const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex");

      if (generatedSignature !== razorpaySignature) {
        return res.status(400).json({ error: "Invalid payment signature" });
      }

      const payment = await storage.getPaymentByOrderId(razorpayOrderId);
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }

      await storage.updatePayment(payment.id, {
        razorpayPaymentId,
        razorpaySignature,
        status: "success",
      });

      await storage.updateBooking(bookingId, {
        paymentId: razorpayPaymentId,
        status: "confirmed",
      });

      res.json({ success: true, message: "Payment verified successfully" });
    } catch (error: any) {
      console.error("Verify payment error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Testimonials endpoints
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Blog endpoints
  app.get("/api/blog", async (req, res) => {
    try {
      const articles = await storage.getBlogArticles();
      res.json(articles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/blog/:id", async (req, res) => {
    try {
      const article = await storage.getBlogArticle(req.params.id);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
