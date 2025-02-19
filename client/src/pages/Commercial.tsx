import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { Contact } from "@/components/sections/Contact";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Building2,
  Store,
  Building,
  Hospital,
  Factory,
  HomeIcon,
  Wrench,
  ClipboardCheck,
  Bell,
  ShieldCheck,
  HardHat,
  BadgeCheck,
} from "lucide-react";
import type { BusinessData } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const BUSINESS_TYPES = [
  {
    icon: Store,
    title: "Restaurants",
    description: "Specialized plumbing solutions for food service establishments"
  },
  {
    icon: Building2,
    title: "Office Buildings",
    description: "Comprehensive systems for multi-story commercial properties"
  },
  {
    icon: Store,
    title: "Retail",
    description: "Reliable plumbing services for retail locations"
  },
  {
    icon: Hospital,
    title: "Medical Facilities",
    description: "Code-compliant solutions for healthcare environments"
  },
  {
    icon: Factory,
    title: "Industrial",
    description: "Heavy-duty plumbing systems for industrial applications"
  },
  {
    icon: HomeIcon,
    title: "Multi-family",
    description: "Efficient solutions for apartment complexes and condominiums"
  }
];

const CORE_SERVICES = {
  Systems: {
    icon: Wrench,
    title: "Commercial Plumbing Systems",
    description: "Complete installation and maintenance of commercial-grade systems",
    services: [
      "System installation",
      "Code compliance",
      "Large-scale repairs",
      "Water supply systems",
      "Sewage systems",
      "Backflow prevention"
    ]
  },
  Maintenance: {
    icon: ClipboardCheck,
    title: "Preventative Maintenance Programs",
    description: "Proactive maintenance to prevent costly disruptions",
    services: [
      "Scheduled inspections",
      "System efficiency audits",
      "Preventative repairs",
      "Record keeping",
      "Emergency prevention",
      "Cost-saving maintenance"
    ]
  },
  Emergency: {
    icon: Bell,
    title: "Emergency Response",
    description: "24/7 emergency services for commercial properties",
    services: [
      "24/7 availability",
      "Rapid response protocols",
      "Minimal business disruption",
      "Temporary solutions",
      "Full repairs",
      "Emergency team deployment"
    ]
  }
};

const FAQ_ITEMS = [
  {
    question: "How do you minimize business disruption during repairs?",
    answer: "We schedule work during off-hours and use efficient repair methods to minimize downtime. Our team coordinates closely with your staff to ensure minimal impact on operations."
  },
  {
    question: "What are your commercial service areas?",
    answer: "We service all types of commercial properties including restaurants, office buildings, retail spaces, medical facilities, and industrial complexes throughout the region."
  },
  {
    question: "Do you provide preventive maintenance programs?",
    answer: "Yes, we offer customized preventive maintenance programs that include regular inspections, system optimization, and scheduled maintenance to prevent costly emergencies."
  },
  {
    question: "Are you licensed for commercial plumbing work?",
    answer: "Yes, we maintain all required commercial licenses and certifications. Our team is fully insured and trained in commercial plumbing systems."
  }
];

export default function Commercial() {
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

  return (
    <div className="min-h-screen">
      <Header businessData={businessData} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#051C45] to-[#0B3D91] py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
            Commercial & Industrial Plumbing Solutions
          </h1>
          <p className="text-xl text-white text-center opacity-90">
            Professional grade plumbing services for businesses by {businessData.basic_info.name}
          </p>
        </div>
      </section>

      {/* Business Types */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BUSINESS_TYPES.map((type, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <type.icon className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                    <p className="text-gray-600">{type.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Commercial Services</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Object.values(CORE_SERVICES).map((service, index) => (
              <Card key={index} className="p-6">
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.services.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Standards & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Licensed & Insured",
                description: "Fully licensed and insured for commercial plumbing work"
              },
              {
                icon: HardHat,
                title: "Safety Certified",
                description: "Strict adherence to safety protocols and regulations"
              },
              {
                icon: BadgeCheck,
                title: "Code Compliant",
                description: "All work meets or exceeds local building codes"
              }
            ].map((cert, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <cert.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                <p className="text-gray-600">{cert.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Commercial FAQs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FAQ_ITEMS.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
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