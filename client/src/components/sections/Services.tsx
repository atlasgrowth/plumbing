import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building2, Clock } from "lucide-react";
import type { BusinessData } from "@shared/schema";
import { useEffect, useRef } from "react";

interface ServicesProps {
  businessData: BusinessData;
}

// This function checks the URL for a "site_id".
// If found, it saves it in localStorage so that it can be reused later.
// If not, it attempts to retrieve the stored "site_id" from localStorage.
const createLink = (path: string): string => {
  const urlParams = new URLSearchParams(window.location.search);
  let siteId = urlParams.get('site_id');
  if (siteId) {
    localStorage.setItem('site_id', siteId);
  } else {
    siteId = localStorage.getItem('site_id');
  }
  const isGitHubPages = window.location.pathname.includes('/plumbing');
  const basePath = isGitHubPages ? '/plumbing' : '';
  return `${basePath}${path}${siteId ? `?site_id=${siteId}` : ''}`;
};

export function Services({ businessData }: ServicesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Home,
      title: "Residential Services",
      description: "Complete plumbing solutions for your home including repairs, installations, and maintenance",
      image: "https://assets.cdn.filesafe.space/jcEKoOF2TKiEyPXqmAdw/media/64fc0ee7c42c8139caa59f04.jpeg",
      color: "#0B3D91",
      link: "/residential",
      type: "page"
    },
    {
      icon: Building2,
      title: "Commercial Services",
      description: "Professional plumbing services for businesses, restaurants, and commercial properties",
      image: "https://www.pmmag.com/ext/resources/Issues/2024/08-August/Columns/PM-0824-Codes-Corner-column-GettyImages-1722486042.jpg?1723468264",
      color: "#051C45",
      link: "/commercial",
      type: "page"
    },
    {
      icon: Clock,
      title: "Emergency Services",
      description: "24/7 emergency plumbing response when you need help fast",
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=80",
      color: "#FF7A00",
      link: "#chat-widget",
      type: "scroll"
    }
  ];

  return (
    <section className="bg-white py-20 md:py-40 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Services
        </h2>

        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-0"
          ref={sectionRef}
        >
          {services.map((service, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl"
              style={{
                animationDelay: `${index * 200}ms`,
                borderColor: service.color
              }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${service.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>

              <div className="relative p-6 text-white h-full flex flex-col">
                <service.icon className="w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-100 mb-6 flex-grow">{service.description}</p>
                <Button
                  variant="outline"
                  className="w-full bg-white/10 backdrop-blur hover:bg-white/20 border-white text-white transition-all duration-300 group-hover:scale-105"
                  onClick={() => {
                    if (service.type === 'scroll') {
                      document.querySelector(service.link)?.scrollIntoView({ behavior: 'smooth' });
                    } else if (service.type === 'page') {
                      const link = createLink(service.link);
                      window.location.href = link;
                    }
                  }}
                >
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
