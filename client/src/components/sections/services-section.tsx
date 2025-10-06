import { motion } from "framer-motion";
import { Brain, GraduationCap, Heart, Briefcase, Users, Shield, Sparkles, Target, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import BookingModal from "@/components/booking-modal";

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookService = (serviceType: string) => {
    setSelectedService(serviceType);
    setIsBookingModalOpen(true);
  };

  const counsellingServices = [
    {
      name: "Adolescent Counselling",
      description: "Supporting teenagers through emotional challenges, peer pressure, and identity development",
      price: 2500,
      icon: Heart,
      serviceType: "COUNSELLING_ADOLESCENT",
    },
    {
      name: "Relationship Counselling",
      description: "Building healthy relationships and communication skills for families and couples",
      price: 3000,
      icon: Users,
      serviceType: "COUNSELLING_RELATIONSHIP",
    },
    {
      name: "Personal Growth Counselling",
      description: "Unlock your potential with goal-setting, self-awareness, and personal development strategies",
      price: 2500,
      icon: Sparkles,
      serviceType: "COUNSELLING_PERSONAL",
    },
  ];

  const careerServices = [
    {
      name: "Career Planning with Mentoria",
      description: "Comprehensive career assessment and planning using India's #1 career guidance platform",
      price: 5000,
      icon: Target,
      serviceType: "CAREER_PLANNING",
    },
    {
      name: "Admission Guidance",
      description: "Expert support for college admissions, entrance exams, and application processes",
      price: 4000,
      icon: GraduationCap,
      serviceType: "ADMISSION_GUIDANCE",
    },
    {
      name: "Special Education Support",
      description: "Tailored strategies and resources for students with special learning needs",
      price: 3500,
      icon: BookOpen,
      serviceType: "SPECIAL_EDUCATION",
    },
  ];

  const workshops = [
    {
      name: "Cyber Hygiene Workshop",
      description: "Digital safety, online privacy, and responsible technology use for families",
      price: 15000,
      icon: Shield,
      serviceType: "WORKSHOP_CYBER",
    },
    {
      name: "Emotional Intelligence Workshop",
      description: "Develop EQ skills for better relationships and professional success",
      price: 15000,
      icon: Heart,
      serviceType: "WORKSHOP_EMOTIONAL",
    },
    {
      name: "Career Awareness Workshop",
      description: "Explore career options, industry trends, and future-ready skills",
      price: 12000,
      icon: Briefcase,
      serviceType: "WORKSHOP_CAREER",
    },
    {
      name: "Classroom Management",
      description: "Effective strategies for teachers to create engaging learning environments",
      price: 18000,
      icon: Users,
      serviceType: "WORKSHOP_CLASSROOM",
    },
    {
      name: "Faculty Development Program",
      description: "Comprehensive training for educators on modern teaching methodologies",
      price: 25000,
      icon: GraduationCap,
      serviceType: "WORKSHOP_FACULTY",
    },
    {
      name: "Prompt Engineering Workshop",
      description: "Master AI tools and prompt engineering for enhanced productivity",
      price: 20000,
      icon: Brain,
      serviceType: "WORKSHOP_PROMPT",
    },
    {
      name: "Critical Thinking Workshop",
      description: "Develop analytical and problem-solving skills for academic and professional success",
      price: 15000,
      icon: Target,
      serviceType: "WORKSHOP_CRITICAL",
    },
  ];

  const ServiceCard = ({ service }: { service: any }) => (
    <Card className="h-full hover-elevate transition-all duration-300 flex flex-col" data-testid={`card-service-${service.serviceType.toLowerCase()}`}>
      <CardHeader>
        <div className="inline-flex p-3 rounded-xl bg-secondary w-fit mb-4">
          <service.icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{service.name}</CardTitle>
        <CardDescription className="text-base">{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <div className="text-2xl font-bold text-foreground">₹{service.price.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">per session</div>
          </div>
          <Button 
            onClick={() => handleBookService(service.serviceType)}
            data-testid={`button-book-${service.serviceType.toLowerCase()}`}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <section className="py-24 bg-background" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-services-title">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support for students, families, and professionals at every stage
            </p>
          </motion.div>

          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Heart className="h-8 w-8 text-purple-600" />
                <h3 className="text-3xl font-bold text-foreground">Counselling Services</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {counsellingServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ServiceCard service={service} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <h3 className="text-3xl font-bold text-foreground">Educational & Career Guidance</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {careerServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ServiceCard service={service} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="h-8 w-8 text-purple-600" />
                <h3 className="text-3xl font-bold text-foreground">Workshops & Seminars</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workshops.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ServiceCard service={service} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceType={selectedService}
      />
    </>
  );
}
