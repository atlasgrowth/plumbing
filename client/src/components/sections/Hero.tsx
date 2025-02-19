import { Phone, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BusinessData } from "@shared/schema";

interface HeroProps {
  businessData: BusinessData;
}

export function Hero({ businessData }: HeroProps) {
  const { name, city, phone, rating } = businessData.basic_info;

  return (
    <section className="relative h-[80vh] md:h-[60vh] overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://assets.cdn.filesafe.space/A9rd4HdLD0sTvRuuQFZl/media/651501775cf2e93f16638cf9.jpeg")',
        }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="container mx-auto max-w-7xl h-full px-4 flex flex-col justify-center items-center text-center text-white relative">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md animate-fadeInDown">
          {name}
        </h1>

        <h2 className="text-xl md:text-2xl mb-8 drop-shadow-md animate-fadeInUp delay-200">
          Professional Plumbing Services {city ? `in ${city}` : ""}
        </h2>

        {rating && (
          <div className="flex items-center gap-1 mb-8 animate-fadeIn delay-400">
            {[...Array(5)].map((_, i) => {
              if (i < Math.floor(rating)) {
                return (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-yellow-400 text-yellow-400"
                  />
                );
              } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
                return (
                  <StarHalf
                    key={i}
                    className="w-6 h-6 fill-yellow-400 text-yellow-400"
                  />
                );
              } else {
                return <Star key={i} className="w-6 h-6 text-gray-400" />;
              }
            })}
            <span className="ml-2 text-white text-sm">
              ({rating.toFixed(1)})
            </span>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 animate-fadeInUp delay-600">
          {phone && (
            <Button
              size="lg"
              className="bg-[#0A2F73] hover:bg-[#092861] text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              onClick={() => (window.location.href = `tel:${phone}`)}
            >
              <Phone className="mr-2 h-4 w-4" />
              {phone}
            </Button>
          )}

          <Button
            size="lg"
            className="bg-[#FF7A00] hover:bg-[#e66e00] text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl animate-float"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Request Service
          </Button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out forwards;
        }

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
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
