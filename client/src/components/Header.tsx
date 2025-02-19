import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BusinessData } from "@shared/schema";

interface HeaderProps {
  businessData: BusinessData;
}

export function Header({ businessData }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

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
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <nav className="container mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Business Name */}
          <div className="flex-shrink-0">
            <Link href={createLink("/")}>
              <a className="text-xl font-bold text-primary">
                {businessData.basic_info.name}
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={createLink(item.href)}>
                <a className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === item.href ? 'text-primary' : 'text-gray-600'
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
                className="gap-2"
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
        {isOpen && (
          <div className="md:hidden">
            <div className="space-y-4 pt-4 pb-3">
              {navigation.map((item) => (
                <Link key={item.name} href={createLink(item.href)}>
                  <a
                    className={`block text-base font-medium ${
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
                  className="w-full gap-2 mt-4"
                  onClick={() => window.location.href = `tel:${businessData.basic_info.phone}`}
                >
                  <Phone className="h-4 w-4" />
                  {businessData.basic_info.phone}
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
