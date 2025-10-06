import { motion } from "framer-motion";
import { Brain, Globe, GraduationCap, Target, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MentoriaSection() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const steps = [
    {
      icon: Brain,
      title: "Psychometric Assessment",
      description: "AI-driven test measuring interests, personality traits, and abilities using John Holland's RIASEC model. Recommends top 10 career paths tailored for Indian students.",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "One-on-One Counselling",
      description: "Certified career counsellors guide you through assessment results via Zoom. Shortlist top 3 ideal careers with parent involvement in final session.",
      color: "text-purple-600",
    },
    {
      icon: Globe,
      title: "Career Library (12,000+ Options)",
      description: "Access comprehensive database with detailed information on courses, salaries, career paths, and admission guidance for India and abroad.",
      color: "text-blue-500",
    },
    {
      icon: Video,
      title: "Industry Expert Webinars",
      description: "Live sessions with professionals providing real-world insights and Q&A opportunities across various fields and specializations.",
      color: "text-purple-500",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50" id="mentoria">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2" data-testid="badge-mentoria">
            Powered by India's #1 Career Guidance Platform
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-mentoria-title">
            Career Discovery with Mentoria
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            PROXIMA partners with Mentoria to provide science-backed career assessments and personalized guidance. 
            Access 12,000+ career options and expert counselling to make informed decisions about your future.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate transition-all duration-300" data-testid={`card-mentoria-step-${index}`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex p-3 rounded-xl bg-secondary">
                        <step.icon className={`h-6 w-6 ${step.color}`} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-xs">Step {index + 1}</Badge>
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pl-20">
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-primary to-accent p-8 md:p-12 rounded-2xl text-white text-center"
        >
          <GraduationCap className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ideal for Students (Class 9-12, College), Working Professionals, and Career Transitions
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-3xl mx-auto">
            Whether you're choosing your stream, planning college admissions, or exploring study abroad options through 
            Mentoria Overseas, PROXIMA's certified counsellors provide expert guidance every step of the way.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="rounded-full px-8 py-6 text-lg"
            onClick={scrollToContact}
            data-testid="button-start-career-discovery"
          >
            <Target className="mr-2 h-5 w-5" />
            Start Your Career Discovery
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
