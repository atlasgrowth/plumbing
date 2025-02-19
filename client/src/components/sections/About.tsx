import { Card } from "@/components/ui/card";
import type { BusinessData } from "@shared/schema";
import { useEffect, useRef, useState } from "react";
import { CheckCircle, Clock, Award, Shield } from "lucide-react";

interface AboutProps {
  businessData: BusinessData;
}

export function About({ businessData }: AboutProps) {
  const { name, city, description } = businessData.basic_info;
  const cityName = city || "your area";
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-gray-50 py-20 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Left side - Image */}
          <div className="relative max-w-2xl mx-auto lg:mx-0">
            <div className="relative overflow-hidden rounded-lg">
              {/* Simple blue outline */}
              <div className="absolute -inset-0.5 border-2 border-blue-200 rounded-lg" />

              <img
                src="https://assets.cdn.filesafe.space/2CUu2UzbKL9UUAOvmqJR/media/98146f6b-66e2-4f7a-aed2-59f7a9c8fce4.jpeg"
                alt={`${name} plumbing services`}
                className="rounded-lg object-cover w-full shadow-md"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            <Card className="p-8 bg-white shadow-md rounded-lg border-0">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-blue-600 mb-4">
                    About {name}
                  </h2>
                  <div className="w-16 h-1 bg-blue-600 mb-6" />
                </div>

                <div className="space-y-4 text-gray-600">
                  <p className="leading-relaxed">
                    {name} has established itself as the premier plumbing service provider in {cityName}.
                  </p>

                  <p className="leading-relaxed">
                    {description || `Our team of certified professionals is committed to delivering exceptional workmanship and customer service. We handle everything from emergency repairs to complete bathroom remodels, ensuring each project meets our high standards of quality.`}
                  </p>

                  <p className="leading-relaxed">
                    What sets us apart is our dedication to transparency, timeliness, and technical expertise. When you choose {name}, you're choosing peace of mind.
                  </p>
                </div>

                {/* Feature badges */}
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-3">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-700">Licensed & Insured</span>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-700">24/7 Emergency Service</span>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-3">
                      <Award className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-700">5-Star Service</span>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-3">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-700">Satisfaction Guaranteed</span>
                  </div>
                </div>

                {/* CTA button */}
                <div className="pt-6">
                  <button className="bg-blue-600 text-white py-3 px-8 rounded-full font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto">
                    Schedule a Consultation
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}