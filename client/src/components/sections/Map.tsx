import { Card } from "@/components/ui/card";
import { Phone, MapPin, Clock } from "lucide-react";
import type { BusinessData } from "@shared/schema";

interface MapProps {
  businessData: BusinessData;
}

export function Map({ businessData }: MapProps) {
  const { name, latitude, longitude, working_hours, phone, city } = businessData.basic_info;

  // Generate a dynamic map URL using MapBox (more reliable than OpenStreetMap)
  const mapUrl =
    latitude && longitude
      ? `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+FF0000(${longitude},${latitude})/${longitude},${latitude},13,0/600x400@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA`
      : null;

  return (
    <section className="bg-[#F5F7FA] py-16 md:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-[400px] relative group">
            {mapUrl ? (
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-[1.02]">
                <img
                  src={mapUrl}
                  alt="Map of service area"
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="absolute inset-0 border-4 border-primary/10 rounded-lg pointer-events-none" />
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Map location not available</p>
                </div>
              </Card>
            )}
          </div>

          <Card className="p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-6 text-primary">Service Area</h2>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">{name}</h3>

            <p className="text-gray-700 mb-8 leading-relaxed">
              Serving {city || "the local area"} and surrounding communities with professional plumbing services.
              We pride ourselves on prompt service and expert solutions for all your plumbing needs.
            </p>

            {working_hours && Object.keys(working_hours).length > 0 && (
              <div className="mb-8 animate-fadeIn">
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-primary">
                  <Clock className="h-5 w-5" />
                  Business Hours
                </h4>
                <div className="space-y-2">
                  {Object.entries(working_hours).map(([day, hours]) => (
                    <div
                      key={day}
                      className="flex justify-between text-gray-700 hover:bg-gray-50 p-2 rounded-md transition-colors"
                    >
                      <span className="font-medium">{day}</span>
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
