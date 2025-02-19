import { Card } from "@/components/ui/card";
import { Phone } from "lucide-react";
import type { BusinessData } from "@shared/schema";

interface MapProps {
  businessData: BusinessData;
}

export function Map({ businessData }: MapProps) {
  const { name, latitude, longitude, working_hours, phone, city } = businessData.basic_info;

  const mapUrl = latitude && longitude
    ? `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_KEY&q=${latitude},${longitude}`
    : null;

  return (
    <section className="bg-[#F5F7FA] py-16 md:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mapUrl ? (
            <div className="h-[400px] w-full">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
          ) : (
            <Card className="h-[400px] flex items-center justify-center">
              <p className="text-gray-500">Map location not available</p>
            </Card>
          )}

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Service Area</h2>
            <h3 className="text-xl font-semibold mb-4">{name}</h3>
            
            <p className="text-gray-600 mb-6">
              Serving {city || "the local area"} and surrounding communities with professional plumbing services.
            </p>

            {working_hours && Object.keys(working_hours).length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Business Hours</h4>
                {Object.entries(working_hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-gray-600">
                    <span>{day}</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
            )}

            {phone && (
              <div className="flex items-center gap-2 text-primary">
                <Phone className="h-5 w-5" />
                <a href={`tel:${phone}`} className="text-lg font-semibold">
                  {phone}
                </a>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
