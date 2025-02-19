import { Phone } from "lucide-react";
import type { BusinessData } from "@shared/schema";

interface FooterProps {
  businessData: BusinessData;
}

export function Footer({ businessData }: FooterProps) {
  const { name, phone, city, working_hours } = businessData.basic_info;

  const getHoursSummary = () => {
    if (!working_hours || Object.keys(working_hours).length === 0) {
      return "Contact us for business hours";
    }
    
    // Just show Mon-Fri hours if available
    const weekdayHours = working_hours["Monday"];
    return weekdayHours ? `Open Mon-Fri ${weekdayHours}` : "Contact us for business hours";
  };

  return (
    <footer className="bg-[#0A2F73] text-white">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-xl mb-4">{name}</h3>
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 mb-2 hover:text-gray-200"
              >
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            )}
            <p className="text-gray-300">{getHoursSummary()}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Services", "About", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-bold text-xl mb-4">Service Areas</h3>
            <p className="text-gray-300">
              {city
                ? `Serving ${city} and surrounding areas`
                : "Serving your local community"}
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#051C45] py-4">
        <div className="container mx-auto max-w-7xl px-4 text-center text-sm">
          <p>
            © {new Date().getFullYear()} {name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
