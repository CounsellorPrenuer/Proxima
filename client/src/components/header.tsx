import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import proximaLogo from "@assets/image_1759756966249.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Home", id: "hero", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: "Why PROXIMA", id: "why-proxima", onClick: () => scrollToSection("why-proxima") },
    { label: "About Ashu Manchanda", id: "about", onClick: () => scrollToSection("about") },
    { label: "Services", id: "services", onClick: () => scrollToSection("services") },
    { label: "Mentoria Partnership", id: "mentoria", onClick: () => scrollToSection("mentoria") },
    { label: "Testimonials", id: "testimonials", onClick: () => scrollToSection("testimonials") },
    { label: "Blog", id: "blog", onClick: () => scrollToSection("blog") },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      data-testid="header-main"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
            data-testid="button-logo"
          >
            <img 
              src={proximaLogo} 
              alt="PROXIMA - Guiding Minds, Guiding Forces" 
              className="h-12 w-auto transition-transform group-hover:scale-105"
            />
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={link.onClick}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                data-testid={`link-nav-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => scrollToSection("contact")}
              data-testid="button-header-contact"
            >
              Book a Consultation
            </Button>
            <Button 
              onClick={() => scrollToSection("services")}
              data-testid="button-header-services"
            >
              Explore Services
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={link.onClick}
                  className="text-left text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                  data-testid={`link-mobile-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => scrollToSection("contact")}
                  className="w-full"
                  data-testid="button-mobile-contact"
                >
                  Book a Consultation
                </Button>
                <Button 
                  onClick={() => scrollToSection("services")}
                  className="w-full"
                  data-testid="button-mobile-services"
                >
                  Explore Services
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
