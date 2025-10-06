import { motion } from "framer-motion";
import { Award, BookOpen, Globe, Lightbulb, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WhyProxima() {
  const features = [
    {
      icon: TrendingUp,
      title: "22+ Years of Expertise",
      description: "Over two decades of proven success in educational counselling and career guidance",
      color: "text-blue-600",
    },
    {
      icon: BookOpen,
      title: "Integrated Approach",
      description: "Comprehensive support combining counselling, career planning, and personal development",
      color: "text-purple-600",
    },
    {
      icon: Lightbulb,
      title: "Leading Tools (Mentoria)",
      description: "Access to India's #1 career guidance platform with 12,000+ career options",
      color: "text-blue-500",
    },
    {
      icon: Award,
      title: "Certified & Credentialed",
      description: "Qualified counsellors with recognized certifications and continuous training",
      color: "text-purple-500",
    },
    {
      icon: Globe,
      title: "Nationwide Impact",
      description: "Serving students and professionals across India with online and in-person sessions",
      color: "text-blue-600",
    },
    {
      icon: Shield,
      title: "Comprehensive Support",
      description: "From adolescent counselling to career guidance and cyber hygiene workshops",
      color: "text-purple-600",
    },
  ];

  return (
    <section className="py-24 bg-secondary/30" id="why-proxima">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-why-title">
            Why Choose PROXIMA?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the difference that expertise, empathy, and cutting-edge tools can make
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate transition-all duration-300" data-testid={`card-feature-${index}`}>
                <CardHeader>
                  <div className="mb-4">
                    <div className="inline-flex p-3 rounded-xl bg-secondary">
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
