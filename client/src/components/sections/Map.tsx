import type { BusinessData } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Phone, MapPin, Clock } from "lucide-react";

interface MapProps {
  businessData: BusinessData;
}

export function Map({ businessData }: MapProps) {
  const { name, latitude, longitude, working_hours, phone, city } = businessData.basic_info;

  // Get today's day for highlighting
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Create Google Maps embed URL
  const mapUrl = latitude && longitude
    ? `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${latitude},${longitude}&zoom=15`
    : `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(name + ' ' + (city || ''))}`;

  return (
    <section className="bg-[#F5F7FA] py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Google Maps iframe */}
          <div className="h-[400px] relative group">
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-[1.02]">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Info card */}
          <Card className="p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-6 text-primary">Location & Hours</h2>

            {name && (
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{name}</h3>
            )}

            <p className="text-gray-700 mb-8 leading-relaxed">
              Serving {city || "the local area"} and surrounding communities with professional services.
            </p>

            {working_hours && Object.keys(working_hours).length > 0 && (
              <div className="mb-8">
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-primary">
                  <Clock className="h-5 w-5" />
                  Business Hours
                </h4>
                <div className="space-y-2">
                  {Object.entries(working_hours).map(([day, hours]) => (
                    <div
                      key={day}
                      className={`flex justify-between text-gray-700 ${
                        day === today ? 'bg-blue-50 p-2 rounded-md font-medium' : 'hover:bg-gray-50 p-2 rounded-md transition-colors'
                      }`}
                    >
                      <span>{day}</span>
                      <span>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {phone && (
              <div className="flex items-center gap-3 text-primary animate-fadeIn">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Phone className="h-6 w-6" />
                </div>
                <a
                  href={`tel:${phone}`}
                  className="text-lg font-semibold hover:text-primary/80 transition-colors"
                >
                  {phone}
                </a>
              </div>
            )}
          </Card>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}