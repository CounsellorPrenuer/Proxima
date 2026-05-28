import { motion } from "framer-motion";
import { Mail, Phone, Globe, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Card } from "@/components/ui/card";
import ConsultationForm from "@/components/consultation-form";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/config";

export default function ContactSection() {
  const mailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Inquiry from Proxima website")}&body=${encodeURIComponent("Hello Team Proxima,%0D%0A%0D%0AI would like to know more about mentorship plans.")}`;
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-contact-title">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your journey? Reach out for a free consultation or to learn more about our services
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Book Your Free Consultation</h3>
              <ConsultationForm />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <a 
                  href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`} 
                  className="flex items-center gap-4 p-4 rounded-xl hover-elevate transition-all group"
                  data-testid="link-phone"
                >
                  <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                      Call Us
                    </div>
                    <div className="text-muted-foreground">{CONTACT_PHONE}</div>
                  </div>
                </a>

                <a 
                  href={mailHref}
                  className="flex items-center gap-4 p-4 rounded-xl hover-elevate transition-all group"
                  data-testid="link-email"
                >
                  <div className="flex-shrink-0 p-3 rounded-xl bg-accent/10">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground group-hover:text-accent transition-colors">
                      Email Us
                    </div>
                    <div className="text-muted-foreground">{CONTACT_EMAIL}</div>
                  </div>
                </a>

                <a 
                  href="https://proximagmgf.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover-elevate transition-all group"
                  data-testid="link-website"
                >
                  <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                      Visit Website
                    </div>
                    <div className="text-muted-foreground">proximagmgf.com</div>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Connect With Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-secondary hover-elevate transition-all"
                    aria-label={social.label}
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="h-5 w-5 text-foreground" />
                  </a>
                ))}
              </div>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary to-accent text-white">
              <h4 className="text-xl font-bold mb-2">Office Hours</h4>
              <p className="opacity-90 mb-4">
                Monday - Saturday: 9:00 AM - 6:00 PM<br />
                Sunday: By Appointment Only
              </p>
              <p className="text-sm opacity-80">
                We're here to support you on your journey to success. Book your free consultation today!
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
