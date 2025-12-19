import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoLandscape from "@/assets/logo-landscape.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "https://blog.jsgliquidators.com", external: true },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logoLandscape} 
              alt="JSG Estate Liquidation" 
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:720-699-5715" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              (720) 699-5715
            </a>
            <Button asChild variant="accent" size="lg">
              <Link to="/contact">Get Free Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4 border-t border-border">
                {navLinks.map((link) => (
                  link.external ? (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`block px-4 py-2 text-base font-medium rounded-md transition-colors ${
                        location.pathname === link.href
                          ? "text-primary bg-secondary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )
                ))}
                <div className="px-4 pt-4 space-y-3">
                  <a href="tel:720-699-5715" className="flex items-center gap-2 text-base font-medium text-foreground">
                    <Phone className="w-5 h-5" />
                    (720) 699-5715
                  </a>
                  <Button asChild variant="accent" size="lg" className="w-full">
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Get Free Quote</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};