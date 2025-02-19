import { Card } from "@/components/ui/card";
import type { BusinessData } from "@shared/schema";
import { useEffect, useRef, useState } from "react";
import { CheckCircle, Award, Shield, Clock } from "lucide-react";

interface AboutProps {
  businessData: BusinessData;
}

export function About({ businessData }: AboutProps) {
  const { name, city, description, years_in_business } = businessData.basic_info;
  const cityName = city || "your area";
  const businessAge = years_in_business || "many";
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
      className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-indigo-100/50 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-blue-200/40" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full border border-indigo-200/40" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 relative">
        <div 
          className={`grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Left side - Image with decorative elements */}
          <div className="md:col-span-5 relative">
            <div className="relative aspect-[4/3] md:aspect-square mx-auto max-w-md">
              {/* Decorative border */}
              <div 
                className="absolute -inset-4 border-2 border-blue-200/40 rounded-xl transform -rotate-3 transition-transform duration-700 group-hover:rotate-0"
                style={{
                  animationDelay: '0.3s',
                  animationFillMode: 'both',
                  animation: isVisible ? 'border-pulse 4s ease-in-out infinite' : 'none'
                }}
              />

              {/* Decorative corner accents */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-blue-500/60 rounded-tl-lg" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-blue-500/60 rounded-tr-lg" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-blue-500/60 rounded-bl-lg" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-blue-500/60 rounded-br-lg" />

              {/* Main image container */}
              <div className="group rounded-xl overflow-hidden shadow-2xl relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

                <img
                  src="https://assets.cdn.filesafe.space/2CUu2UzbKL9UUAOvmqJR/media/98146f6b-66e2-4f7a-aed2-59f7a9c8fce4.jpeg"
                  alt={`${name} plumbing services`}
                  className="rounded-xl object-cover w-full h-full transition-all duration-700 transform group-hover:scale-105"
                />
              </div>
            </div>

            {/* Experience badge */}
            <div 
              className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-4 md:p-5 rounded-full shadow-xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-all duration-500"
              style={{
                width: '120px',
                height: '120px',
                animationDelay: '0.6s',
                animation: isVisible ? 'float 6s ease-in-out infinite' : 'none'
              }}
            >
              <div className="text-center">
                <span className="block text-3xl font-bold">{businessAge}+</span>
                <span className="text-xs uppercase tracking-wide">Years Experience</span>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="md:col-span-7">
            <Card className="p-8 md:p-10 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0">
              <div
                className="space-y-6 md:space-y-8"
                style={{
                  animationDelay: '0.3s'
                }}
              >
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
                    About {name}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6" />
                </div>

                <div className="space-y-4 text-gray-700">
                  <p className="text-lg md:text-xl leading-relaxed">
                    With over {businessAge} years of experience, {name} has established itself as the premier plumbing service provider in {cityName}.
                  </p>

                  <p className="text-lg leading-relaxed">
                    {description || `Our team of certified professionals is committed to delivering exceptional workmanship and customer service. We handle everything from emergency repairs to complete bathroom remodels, ensuring each project meets our high standards of quality.`}
                  </p>

                  <p className="text-lg leading-relaxed">
                    What sets us apart is our dedication to transparency, timeliness, and technical expertise. When you choose {name}, you're choosing peace of mind.
                  </p>
                </div>

                {/* Feature badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl transition-all duration-300 hover:bg-blue-50 hover:shadow-md">
                    <div className="bg-blue-100 p-3 rounded-full mb-3">
                      <CheckCircle className="h-6 w-6 text-blue-700" />
                    </div>
                    <span className="font-medium text-gray-900">Licensed & Insured</span>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl transition-all duration-300 hover:bg-blue-50 hover:shadow-md">
                    <div className="bg-blue-100 p-3 rounded-full mb-3">
                      <Clock className="h-6 w-6 text-blue-700" />
                    </div>
                    <span className="font-medium text-gray-900">24/7 Emergency Service</span>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl transition-all duration-300 hover:bg-blue-50 hover:shadow-md">
                    <div className="bg-blue-100 p-3 rounded-full mb-3">
                      <Award className="h-6 w-6 text-blue-700" />
                    </div>
                    <span className="font-medium text-gray-900">5-Star Service</span>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl transition-all duration-300 hover:bg-blue-50 hover:shadow-md">
                    <div className="bg-blue-100 p-3 rounded-full mb-3">
                      <Shield className="h-6 w-6 text-blue-700" />
                    </div>
                    <span className="font-medium text-gray-900">Satisfaction Guaranteed</span>
                  </div>
                </div>

                {/* CTA button */}
                <div className="pt-4">
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-8 rounded-full font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 flex items-center justify-center w-full md:w-auto">
                    Schedule a Consultation
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(6deg); }
          50% { transform: translate(0, -10px) rotate(3deg); }
          100% { transform: translate(0, 0) rotate(6deg); }
        }

        @keyframes border-pulse {
          0% { border-color: rgba(59, 130, 246, 0.2); }
          50% { border-color: rgba(99, 102, 241, 0.4); }
          100% { border-color: rgba(59, 130, 246, 0.2); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

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
      `}</style>
    </section>
  );
}