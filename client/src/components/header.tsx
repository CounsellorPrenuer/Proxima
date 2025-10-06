import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  const aboutLinks = [
    { label: "Why PROXIMA", id: "why-proxima", onClick: () => scrollToSection("why-proxima") },
    { label: "About Ashu Manchanda", id: "about", onClick: () => scrollToSection("about") },
  ];

  const navLinks = [
    { label: "Services", id: "services", onClick: () => scrollToSection("services") },
    { label: "Mentoria Partnership", id: "mentoria", onClick: () => scrollToSection("mentoria") },
    { label: "Testimonials", id: "testimonials", onClick: () => scrollToSection("testimonials") },
    { label: "Blog", id: "blog", onClick: () => scrollToSection("blog") },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent shadow-sm"
      }`}
      style={{ boxShadow: isScrolled ? '0 2px 8px rgba(0, 0, 0, 0.06)' : '0 2px 8px rgba(0, 0, 0, 0.06)' }}
      data-testid="header-main"
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
            data-testid="button-logo"
          >
            <img 
              src={proximaLogo} 
              alt="PROXIMA - Guiding Minds, Guiding Forces" 
              className="h-[50px] w-auto transition-transform group-hover:scale-105"
            />
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger 
                className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors duration-300 ease-in-out outline-none"
                data-testid="dropdown-about"
              >
                About <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {aboutLinks.map((link) => (
                  <DropdownMenuItem
                    key={link.id}
                    onClick={link.onClick}
                    className="cursor-pointer transition-colors duration-300 ease-in-out"
                    data-testid={`dropdown-item-${link.id}`}
                  >
                    {link.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={link.onClick}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300 ease-in-out"
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
              className="transition-all duration-300 ease-in-out hover:border-primary"
              data-testid="button-header-contact"
            >
              Book a Consultation
            </Button>
            <Button 
              onClick={() => scrollToSection("services")}
              className="transition-all duration-300 ease-in-out"
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
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                About
              </div>
              {aboutLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={link.onClick}
                  className="text-left text-base font-medium text-foreground hover:text-primary transition-colors duration-300 ease-in-out py-2 pl-4"
                  data-testid={`link-mobile-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
              <div className="border-t my-2"></div>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={link.onClick}
                  className="text-left text-base font-medium text-foreground hover:text-primary transition-colors duration-300 ease-in-out py-2"
                  data-testid={`link-mobile-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => scrollToSection("contact")}
                  className="w-full transition-all duration-300 ease-in-out"
                  data-testid="button-mobile-contact"
                >
                  Book a Consultation
                </Button>
                <Button 
                  onClick={() => scrollToSection("services")}
                  className="w-full transition-all duration-300 ease-in-out"
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
