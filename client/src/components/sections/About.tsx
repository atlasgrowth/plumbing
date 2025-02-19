import { Card } from "@/components/ui/card";
import type { BusinessData } from "@shared/schema";

interface AboutProps {
  businessData: BusinessData;
}

export function About({ businessData }: AboutProps) {
  const { name, city } = businessData.basic_info;
  const cityName = city || "your area";

  return (
    <section className="bg-[#F0F8FF] py-20 md:py-40">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-video md:aspect-square">
            <img
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80"
              alt="Professional plumber at work"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          
          <Card className="p-8 bg-white/80 backdrop-blur">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About {name}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {name} provides reliable plumbing services in {cityName} and surrounding communities. Our experienced technicians are committed to quality workmanship and customer satisfaction.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Whether you need emergency repairs, routine maintenance, or new installations, we have the skills and equipment to get the job done right the first time.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
