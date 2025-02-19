import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BusinessData } from "@shared/schema";

interface HeaderProps {
  businessData: BusinessData;
}

export function Header({ businessData }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get current site_id from URL to preserve it in navigation
  const urlParams = new URLSearchParams(window.location.search);
  const siteId = urlParams.get('site_id');

  // Helper to create links with preserved site_id
  const createLink = (path: string) => {
    return `${path}${siteId ? `?site_id=${siteId}` : ''}`;
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Residential', href: '/residential' },
    { name: 'Commercial', href: '/commercial' },
    { name: 'Contact', href: '/#contact' }
  ];

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-md' 
          : 'bg-white shadow-sm'
      }`}
      style={{
        animation: 'slideDown 0.5s ease-out'
      }}
    >
      <style jsx global>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }

        .nav-link {
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #0B3D91;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
      `}</style>

      <nav className="container mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Business Name */}
          <div className="flex-shrink-0">
            <Link href={createLink("/")}>
              <a className="text-xl font-bold text-primary hover:opacity-90 transition-opacity">
                {businessData.basic_info.name}
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={createLink(item.href)}>
                <a className={`nav-link text-sm font-medium transition-all hover:text-primary ${
                  location === item.href ? 'text-primary active' : 'text-gray-600'
                }`}>
                  {item.name}
                </a>
              </Link>
            ))}
          </div>

          {/* Phone Button */}
          {businessData.basic_info.phone && (
            <div className="hidden md:block">
              <Button
                variant="outline"
                className="gap-2 transition-transform hover:scale-105 duration-300"
                onClick={() => window.location.href = `tel:${businessData.basic_info.phone}`}
              >
                <Phone className="h-4 w-4" />
                {businessData.basic_info.phone}
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="transition-colors hover:bg-gray-100"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}>
          <div className="space-y-4 pt-4 pb-3">
            {navigation.map((item) => (
              <Link key={item.name} href={createLink(item.href)}>
                <a
                  className={`block text-base font-medium transition-colors hover:text-primary ${
                    location === item.href ? 'text-primary' : 'text-gray-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              </Link>
            ))}
            {businessData.basic_info.phone && (
              <Button
                variant="outline"
                className="w-full gap-2 mt-4 transition-transform hover:scale-105"
                onClick={() => window.location.href = `tel:${businessData.basic_info.phone}`}
              >
                <Phone className="h-4 w-4" />
                {businessData.basic_info.phone}
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}