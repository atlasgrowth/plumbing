import { Hero } from "@/components/sections/Hero";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { Contact } from "@/components/sections/Contact";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import { Wrench, Droplet, FlameKindling, Shield, Hammer, Clock } from "lucide-react";
import type { BusinessData } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";

const FILTER_CATEGORIES = [
  "All Services",
  "Repairs",
  "Installation",
  "Maintenance",
  "Emergency"
] as const;

const SERVICE_CATEGORIES = {
  Repairs: {
    icon: Wrench,
    title: "Repairs & Fixes",
    description: "Professional repair services for all your plumbing needs",
    services: [
      "Leak repairs",
      "Pipe repairs",
      "Fixture repairs",
      "Drain unclogging",
      "Water pressure issues",
      "Toilet repairs"
    ]
  },
  Installation: {
    icon: Hammer,
    title: "Installation Services",
    description: "Expert installation of plumbing fixtures and systems",
    services: [
      "Fixture installation",
      "Water heater installation",
      "Pipe installation",
      "Bathroom remodels",
      "Kitchen plumbing",
      "Garbage disposal installation"
    ]
  },
  Maintenance: {
    icon: Shield,
    title: "Maintenance & Inspections",
    description: "Preventive maintenance to keep your plumbing system running smoothly",
    services: [
      "Annual plumbing inspection",
      "Drain cleaning",
      "Water heater maintenance",
      "Pipe insulation",
      "Winterization",
      "Water quality testing"
    ]
  },
  Emergency: {
    icon: Clock,
    title: "Emergency Services",
    description: "24/7 emergency plumbing services when you need them most",
    services: [
      "Burst pipe repair",
      "Major leaks",
      "Sewer backups",
      "Water heater failures",
      "Frozen pipe thawing",
      "Flooding issues"
    ]
  }
};

export default function Residential() {
  const [activeFilter, setActiveFilter] = useState<typeof FILTER_CATEGORIES[number]>("All Services");
  const sectionRef = useRef<HTMLDivElement>(null);

  const { data: businessData, isLoading, error } = useQuery<BusinessData>({
    queryKey: ['business-data'],
    queryFn: async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const siteId = urlParams.get('site_id');
      
      if (!siteId && process.env.NODE_ENV === 'development') {
        return {
          basic_info: {
            name: "Arkansas Professional Plumbing",
            city: "Little Rock",
            phone: "(501) 555-0123",
            rating: 4.8,
            working_hours: {
              "Monday": "8:00 AM - 5:00 PM",
              "Tuesday": "8:00 AM - 5:00 PM",
              "Wednesday": "8:00 AM - 5:00 PM",
              "Thursday": "8:00 AM - 5:00 PM",
              "Friday": "8:00 AM - 5:00 PM"
            },
            latitude: 34.7465,
            longitude: -92.2896
          }
        };
      }

      const response = await fetch(
        `https://raw.githubusercontent.com/atlasgrowth/Arkansasplumbers/main/data/processed/businesses/${siteId || 'default'}.json`
      );
      
      if (!response.ok) {
        throw new Error('Failed to load business data');
      }
      
      return response.json();
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !businessData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h1>
          <p className="text-gray-600 mb-4">{error?.message || 'Failed to load business data'}</p>
        </div>
      </div>
    );
  }

  const filteredCategories = Object.entries(SERVICE_CATEGORIES).filter(([category]) => {
    if (activeFilter === "All Services") return true;
    return category === activeFilter;
  });

  return (
    <div className="min-h-screen">
      <Header businessData={businessData} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B3D91] via-[#1E90FF] to-[#00BFFF] py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        <div className="container mx-auto max-w-7xl px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
              Expert Residential Plumbing Services
            </h1>
            <p className="text-xl text-white text-center opacity-90 max-w-2xl mx-auto">
              Professional plumbing solutions for your home by {businessData.basic_info.name}. 
              Available 24/7 for all your plumbing needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="bg-white sticky top-16 z-40 border-b shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {FILTER_CATEGORIES.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                onClick={() => setActiveFilter(filter)}
                className={`min-w-max transition-all duration-300 ${
                  activeFilter === filter 
                    ? "scale-105 shadow-md" 
                    : "hover:scale-105"
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <section className="py-12 md:py-20 bg-gray-50" ref={sectionRef}>
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredCategories.map(([category, data], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        <data.icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                          {data.title}
                        </h2>
                        <p className="text-gray-600 mb-6">{data.description}</p>
                        <ul className="space-y-2 mb-6">
                          {data.services.map((service) => (
                            <li key={service} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {service}
                            </li>
                          ))}
                        </ul>
                        <Button
                          className="w-full md:w-auto group-hover:scale-105 transition-transform duration-300"
                          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                          Request Service
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Trust Building Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Fast Response Times",
                description: "Quick response to all service calls with 24/7 emergency availability"
              },
              {
                icon: Shield,
                title: "Quality Guarantee",
                description: "All our work is backed by our satisfaction guarantee"
              },
              {
                icon: Hammer,
                title: "Experienced Technicians",
                description: "Licensed, insured, and extensively trained professionals"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Contact businessData={businessData} />
      <Footer businessData={businessData} />

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

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}