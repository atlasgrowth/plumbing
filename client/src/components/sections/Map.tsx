import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Phone, MapPin, Clock, Navigation, Shield, Calendar } from "lucide-react";
import type { BusinessData } from "@shared/schema";

interface MapProps {
  businessData: BusinessData;
}

export function Map({ businessData }: MapProps) {
  const { name, latitude, longitude, working_hours, phone, city, address, zip_code, state } = businessData.basic_info;
  const sectionRef = useRef<HTMLDivElement>(null);

  // Format full address
  const fullAddress = [address, city, state, zip_code].filter(Boolean).join(", ");

  // Get today's day for highlighting
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Calculate marker position based on latitude/longitude
  // This maps the coordinates to a position within our grid
  const getMarkerPosition = () => {
    if (!latitude || !longitude) return { top: '50%', left: '50%' };

    // Create a simple mapping that keeps the marker within the visible area
    // This is a basic conversion - in a real app you'd use proper geospatial math
    const normalizedLat = ((latitude + 90) / 180); // Convert from -90/90 to 0-1 range
    const normalizedLng = ((longitude + 180) / 360); // Convert from -180/180 to 0-1 range

    // Limit the range to keep marker visible (10%-90% of container)
    const visibleLat = 90 - (normalizedLat * 80 + 10);
    const visibleLng = normalizedLng * 80 + 10;

    return {
      top: `${visibleLat}%`,
      left: `${visibleLng}%`
    };
  };

  const markerPosition = getMarkerPosition();

  return (
    <section 
      ref={sectionRef}
      className="bg-[#F5F7FA] py-16 md:py-24"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map area - simplified grid design */}
          <div className="h-[400px] relative group">
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-[1.02]">
              {/* Simple grid-based map */}
              <div className="w-full h-full bg-[#EBF4FF] relative">
                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
                  {Array(100).fill(0).map((_, i) => (
                    <div key={i} className="border border-blue-100/50" />
                  ))}
                </div>

                {/* Main roads */}
                <div className="absolute top-1/2 left-0 right-0 h-4 bg-blue-200/30 transform -translate-y-1/2"></div>
                <div className="absolute left-1/3 top-0 bottom-0 w-4 bg-blue-200/30"></div>
                <div className="absolute right-1/4 top-0 bottom-0 w-3 bg-blue-200/30"></div>

                {/* Location marker - positioned by coordinates */}
                <div 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2" 
                  style={{ 
                    top: markerPosition.top, 
                    left: markerPosition.left
                  }}
                >
                  <div className="relative">
                    {/* Pulsing effect */}
                    <div className="absolute -inset-6 rounded-full bg-blue-400/10 animate-pulse"></div>
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>

                {/* Direction button */}
                <div className="absolute top-4 right-4">
                  <a
                    href={`https://maps.google.com/?q=${latitude},${longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-md shadow-md text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors"
                  >
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </a>
                </div>

                {/* Service area indicator */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-md shadow-md">
                  <p className="text-xs font-medium text-gray-700">Service Area</p>
                  <p className="text-xs text-gray-500">{city || "Local area"} & surrounding communities</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info card */}
          <Card className="p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-6 text-primary">{name}</h2>

            {fullAddress && (
              <div className="flex items-start gap-3 mb-6">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-gray-700">{fullAddress}</p>
              </div>
            )}

            <p className="text-gray-700 mb-8 leading-relaxed">
              Serving {city || "the local area"} and surrounding communities with professional plumbing services.
              We pride ourselves on prompt service and expert solutions for all your plumbing needs.
            </p>

            {/* Why Choose Us section */}
            <h3 className="font-semibold mb-4">Why Choose Us</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-md">
                <div className="text-primary">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="text-gray-700 text-sm">Licensed & Insured</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-md">
                <div className="text-primary">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="text-gray-700 text-sm">Satisfaction Guaranteed</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-md">
                <div className="text-primary">
                  <Navigation className="h-5 w-5" />
                </div>
                <span className="text-gray-700 text-sm">Fast Response</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-md">
                <div className="text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <span className="text-gray-700 text-sm">Same-Day Service</span>
              </div>
            </div>

            {/* Business hours */}
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
                      className={`flex justify-between p-2 rounded-md transition-colors ${
                        day === today ? 'bg-blue-50 font-medium' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-gray-700">{day}</span>
                      <span className="text-gray-700">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Phone number */}
            {phone && (
              <div className="flex items-center gap-3 text-primary">
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
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }