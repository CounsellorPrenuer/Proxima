import { motion } from "framer-motion";
import { Award, Heart, Lightbulb, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import ashuImage from "@assets/image_1759757019176.png";

export default function AboutAshu() {
  return (
    <section className="py-24 bg-background" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-about-title">
            Meet Ashu Manchanda
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A visionary educator and counsellor with 22+ years of transformative experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl"></div>
              <img
                src={ashuImage}
                alt="Ashu Manchanda - Professional Educational Counsellor"
                className="relative rounded-2xl shadow-xl w-full"
                data-testid="img-ashu-manchanda"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-3xl font-semibold text-foreground mb-4" data-testid="text-ashu-headline">
                Empathetic. Action-Oriented. Future-Ready.
              </h3>
              <p className="text-lg text-foreground leading-relaxed mb-4">
                With over 22 years of dedication to teaching and counselling, Ashu Manchanda brings a unique blend of 
                expertise in educational psychology, career guidance, and cyber security awareness.
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-4">
                Her mission is clear: to empower individuals to discover their true potential and navigate life's 
                challenges with confidence and clarity. As a certified Mentoria counsellor, she combines cutting-edge 
                career assessment tools with deep personal insight.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, label: "22+ Years Teaching", color: "text-blue-600" },
                { icon: Heart, label: "Certified Counsellor", color: "text-purple-600" },
                { icon: Shield, label: "Cyber Security Expert", color: "text-blue-500" },
                { icon: Lightbulb, label: "Mentoria Partner", color: "text-purple-500" },
              ].map((item, index) => (
                <Card key={index} className="p-4 hover-elevate" data-testid={`card-credential-${index}`}>
                  <item.icon className={`h-8 w-8 ${item.color} mb-2`} />
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                </Card>
              ))}
            </div>

            <div className="pt-4">
              <p className="text-base text-muted-foreground italic">
                "Every student has unique potential. My role is to help them discover it, nurture it, 
                and transform it into a fulfilling career and life."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
