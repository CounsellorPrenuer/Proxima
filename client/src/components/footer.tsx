import { Mail, Phone, Globe, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import proximaLogo from "@assets/image_1759756966249.png";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-white py-12" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <img 
              src={proximaLogo} 
              alt="PROXIMA" 
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-sm text-white/80 leading-relaxed">
              Empowering minds and guiding futures with 22+ years of educational excellence and counselling expertise.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { label: "Why PROXIMA", id: "why-proxima" },
                { label: "About Ashu", id: "about" },
                { label: "Services", id: "services" },
                { label: "Mentoria", id: "mentoria" },
                { label: "Testimonials", id: "testimonials" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-sm text-white/80 hover:text-white transition-colors"
                  data-testid={`link-footer-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <a 
                href="tel:+919650660584" 
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                data-testid="link-footer-phone"
              >
                <Phone className="h-4 w-4" />
                +91 9650660584
              </a>
              <a 
                href="mailto:proximagmgf@gmail.com" 
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                data-testid="link-footer-email"
              >
                <Mail className="h-4 w-4" />
                proximagmgf@gmail.com
              </a>
              <a 
                href="https://proximagmgf.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                data-testid="link-footer-website"
              >
                <Globe className="h-4 w-4" />
                proximagmgf.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                  data-testid={`link-footer-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/80">
              © 2025 PROXIMA. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <button className="text-sm text-white/80 hover:text-white transition-colors" data-testid="link-privacy">
                Privacy Policy
              </button>
              <button className="text-sm text-white/80 hover:text-white transition-colors" data-testid="link-terms">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
