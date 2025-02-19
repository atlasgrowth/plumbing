import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Droplet, FlameKindling } from "lucide-react";
import type { BusinessData } from "@shared/schema";

interface ServicesProps {
  businessData: BusinessData;
}

const DEFAULT_SERVICES = [
  {
    icon: Wrench,
    title: "Emergency Repairs",
    description: "24/7 emergency plumbing services for when you need us most. Fast response times and reliable solutions."
  },
  {
    icon: Droplet,
    title: "Drain Cleaning",
    description: "Professional drain cleaning services to clear clogs and prevent future blockages. State-of-the-art equipment."
  },
  {
    icon: FlameKindling,
    title: "Water Heater Services",
    description: "Installation, repair, and maintenance of water heaters. Expert service for both traditional and tankless systems."
  }
];

export function Services({ businessData }: ServicesProps) {
  return (
    <section className="bg-white py-20 md:py-40">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEFAULT_SERVICES.map((service, index) => (
            <Card
              key={index}
              className="p-6 transition-shadow hover:shadow-lg border border-gray-200"
            >
              <service.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Button
                variant="outline"
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
  );
}
