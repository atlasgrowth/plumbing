import { Card } from "@/components/ui/card";
import type { BusinessData } from "@shared/schema";
import { useEffect, useRef } from "react";

interface AboutProps {
  businessData: BusinessData;
}

export function About({ businessData }: AboutProps) {
  const { name, city } = businessData.basic_info;
  const cityName = city || "your area";
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
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

  return (
    <section className="bg-gradient-to-b from-[#F0F8FF] to-[#E6F4FF] py-20 md:py-40 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center opacity-0"
          ref={sectionRef}
        >
          <div className="relative aspect-video md:aspect-square group">
            <div className="absolute inset-0 bg-primary/10 rounded-lg transform -rotate-3 scale-95 transition-transform duration-500 group-hover:rotate-0" />
            <img
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80"
              alt="Professional plumber at work"
              className="rounded-lg object-cover w-full h-full shadow-xl transition-all duration-500 transform group-hover:scale-105 relative z-10"
            />
          </div>

          <Card className="p-8 bg-white/80 backdrop-blur border-l-4 border-primary transform transition-all duration-500 hover:translate-y-[-4px] hover:shadow-xl">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                About {name}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {name} provides reliable plumbing services in {cityName} and surrounding communities. Our experienced technicians are committed to quality workmanship and customer satisfaction.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Whether you need emergency repairs, routine maintenance, or new installations, we have the skills and equipment to get the job done right the first time.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-primary">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>24/7 Emergency Service</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>100% Satisfaction</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}