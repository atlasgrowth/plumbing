import { Phone, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BusinessData } from "@shared/schema";

interface HeroProps {
  businessData: BusinessData;
}

export function Hero({ businessData }: HeroProps) {
  // Safely access potentially undefined properties
  const name = businessData.basic_info.name;
  const city = businessData.basic_info.city;
  const phone = businessData.basic_info.phone;
  const rating = businessData.basic_info.rating;

  // Simplified water pattern SVG
  const waterPatternSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
      <path d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z" fill="white" fill-opacity="0.05"/>
      <path d="M30 50C41.0457 50 50 41.0457 50 30C50 18.9543 41.0457 10 30 10C18.9543 10 10 18.9543 10 30C10 41.0457 18.9543 50 30 50Z" fill="white" fill-opacity="0.08"/>
    </svg>
  `;

  // Create base64 encoded SVG
  const encodedSvg = btoa(waterPatternSvg);

  return (
    <section className="relative h-[80vh] md:h-[60vh] bg-gradient-to-r from-[#0B3D91] to-[#1E90FF] overflow-hidden">
      {/* Water texture overlay - using a simpler pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml;base64,${encodedSvg}")`,
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="container mx-auto max-w-7xl h-full px-4 flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
          {name}
        </h1>

        <h2 className="text-xl md:text-2xl mb-8 drop-shadow-md">
          Professional Plumbing Services {city ? `in ${city}` : ''}
        </h2>

        {rating && (
          <div className="flex items-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => {
              // For whole stars
              if (i < Math.floor(rating)) {
                return <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />;
              }
              // For half stars
              else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
                return <StarHalf key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />;
              }
              // For empty stars
              else {
                return <Star key={i} className="w-6 h-6 text-gray-400" />;
              }
            })}
            <span className="ml-2 text-white text-sm">({rating.toFixed(1)})</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          {phone && (
            <Button
              size="lg"
              className="bg-[#0A2F73] hover:bg-[#092861] text-white shadow-lg"
              onClick={() => window.location.href = `tel:${phone}`}
            >
              <Phone className="mr-2 h-4 w-4" />
              {phone}
            </Button>
          )}

          <Button
            size="lg"
            className="bg-[#FF7A00] hover:bg-[#e66e00] text-white shadow-lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Request Service
          </Button>
        </div>
      </div>
    </section>
  );
}