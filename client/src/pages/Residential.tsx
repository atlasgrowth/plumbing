import { Hero } from "@/components/sections/Hero";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { Contact } from "@/components/sections/Contact";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Wrench, Droplet, FlameKindling, Shield, Hammer, Clock } from "lucide-react";
import type { BusinessData } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/LoadingSpinner";

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

  const { data: businessData, isLoading, error } = useQuery<BusinessData>({
    queryKey: ['business-data'],
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

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
      <section className="bg-gradient-to-r from-[#0B3D91] to-[#1E90FF] py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
            Residential Plumbing Services
          </h1>
          <p className="text-xl text-white text-center opacity-90">
            Professional plumbing solutions for your home by {businessData.basic_info.name}
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="bg-gray-50 sticky top-16 z-40 border-b">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
            {FILTER_CATEGORIES.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                onClick={() => setActiveFilter(filter)}
                className="min-w-max"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCategories.map(([category, data]) => (
              <Card key={category} className="p-6">
                <div className="flex items-start gap-4">
                  <data.icon className="w-8 h-8 text-primary mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
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
                      className="w-full md:w-auto"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Request Service
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Building Section */}
      <section className="bg-[#F5F7FA] py-16">
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
              <Card key={index} className="p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Contact businessData={businessData} />
      <Footer businessData={businessData} />
    </div>
  );
}