import { Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BusinessData } from "@shared/schema";

interface HeroProps {
  businessData: BusinessData;
}

export function Hero({ businessData }: HeroProps) {
  const { name, city, phone, rating } = businessData.basic_info;

  return (
    <section className="relative h-[80vh] md:h-[60vh] bg-gradient-to-r from-[#0B3D91] to-[#1E90FF] overflow-hidden">
      {/* Water texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiPgo8cGF0aCBkPSJNMjggNjZMMCA1MEwyOCAzNEw1NiA1MEwyOCA2NkwyOCAxMDBMMjggNjZaIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMjggMEwyOCAzNEwwIDUwTDAgMEwyOCAwWiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPHBhdGggZD0iTTI4IDBMNTY1MEw1NiAwTDI4IDBaIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-10" />

      <div className="container mx-auto max-w-7xl h-full px-4 flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow">
          {name}
        </h1>
        <h2 className="text-xl md:text-2xl mb-8 text-shadow">
          Professional Plumbing Services {city ? `in ${city}` : ''}
        </h2>

        {rating && (
          <div className="flex items-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.floor(rating) ? 'fill-yellow-400' : 'fill-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          {phone && (
            <Button
              size="lg"
              className="bg-[#0A2F73] hover:bg-[#092861]"
              onClick={() => window.location.href = `tel:${phone}`}
            >
              <Phone className="mr-2 h-4 w-4" />
              {phone}
            </Button>
          )}
          <Button
            size="lg"
            className="bg-[#FF7A00] hover:bg-[#e66e00]"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Request Service
          </Button>
        </div>
      </div>
    </section>
  );
}
