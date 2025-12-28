import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const serviceAreas = ["Highlands Ranch", "Denver", "Castle Rock", "Englewood", "Littleton"];

const services = [
  { name: "Estate Sale Auctions", href: "/services#auctions" },
  { name: "E-Commerce Consignment", href: "/services#consignment" },
  { name: "Business Liquidation", href: "/services#business" },
  { name: "Estate Cleanout", href: "/services#cleanout" },
  { name: "Junk Removal", href: "/services#junk" },
];

export const Footer = forwardRef<HTMLElement>((_, ref) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer ref={ref} className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center border border-primary-foreground/20">
                <span className="font-display font-bold text-xl">JSG</span>
              </div>
              <div>
                <p className="font-display font-semibold text-lg leading-tight">JSG Liquidators</p>
                <p className="text-xs text-primary-foreground/70">Estate Liquidation Experts</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Colorado's trusted estate liquidation company. Our auction services can help offset or cover your costs.
            </p>
            <div className="flex items-center gap-2 text-accent">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">Serving the Greater Denver Metro Area</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Service Areas</h4>
            <ul className="space-y-2">
              {serviceAreas.map((area) => (
                <li key={area} className="text-sm text-primary-foreground/80">
                  {area}, CO
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="tel:805-444-4069"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">David: (805) 444-4069</span>
              </a>
              <a
                href="tel:805-340-4817"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Vincent: (805) 340-4817</span>
              </a>
              <a
                href="mailto:jsgliquidators@gmail.com"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">jsgliquidators@gmail.com</span>
              </a>
            </div>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium text-sm hover:bg-copper-light transition-colors"
              >
                Get Your Free Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} JSG Liquidators. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://denveronlineauctions.com/marketplace/jsg-estate-liquidation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-foreground/60 hover:text-accent transition-colors"
              >
                View Our Auctions
              </a>
              <a
                href="https://blog.jsgliquidators.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-foreground/60 hover:text-accent transition-colors"
              >
                Read Our Blog
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
