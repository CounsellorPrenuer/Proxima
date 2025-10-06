import { motion } from "framer-motion";
import { ArrowRight, Award, BookOpen, Brain, CheckCircle, GraduationCap, Heart, Lightbulb, Shield, Users, Globe, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeroSection from "@/components/sections/hero-section";
import AboutAshu from "@/components/sections/about-ashu";
import WhyProxima from "@/components/sections/why-proxima";
import ServicesSection from "@/components/sections/services-section";
import MentoriaSection from "@/components/sections/mentoria-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import BlogSection from "@/components/sections/blog-section";
import ContactSection from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutAshu />
      <WhyProxima />
      <MentoriaSection />
      <ServicesSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
}
