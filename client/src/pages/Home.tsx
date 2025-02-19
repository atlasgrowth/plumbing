import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Reviews } from "@/components/sections/Reviews";
import { Map } from "@/components/sections/Map";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import type { BusinessData } from "@shared/schema";
import { businessDataSchema } from "@shared/schema";

// Fallback data for development and testing
const FALLBACK_DATA: BusinessData = {
  basic_info: {
    name: "Arkansas Professional Plumbing",
    city: "Little Rock",
    phone: "(501) 555-0123",
    rating: 4.8,
    working_hours: {
      "Monday": "8:00 AM - 5:00 PM",
      "Tuesday": "8:00 AM - 5:00 PM",
      "Wednesday": "8:00 AM - 5:00 PM",
      "Thursday": "8:00 AM - 5:00 PM",
      "Friday": "8:00 AM - 5:00 PM"
    },
    latitude: 34.7465,
    longitude: -92.2896
  },
  five_star_reviews: [
    {
      text: "Excellent service! Fixed our emergency leak quickly and professionally.",
      reviewer_name: "John D.",
      date: "2024-02-15"
    },
    {
      text: "Very professional and knowledgeable team. Would highly recommend!",
      reviewer_name: "Sarah M.",
      date: "2024-02-10"
    }
  ]
};

const getBusinessData = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const siteId = urlParams.get('site_id');

  // For development/testing, use fallback data if no site_id is provided
  if (!siteId && process.env.NODE_ENV === 'development') {
    console.log('Using fallback data for development');
    return FALLBACK_DATA;
  }

  if (!siteId) {
    throw new Error('Please provide a site_id parameter in the URL');
  }

  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/atlasgrowtth/Arkansasplumbers/main/data/processed/businesses/${siteId}.json`
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Business data not found for site ID: ${siteId}, using fallback data`);
        return FALLBACK_DATA;
      }
      throw new Error(`Failed to load business data: ${response.status}`);
    }

    const data = await response.json();
    const parsed = businessDataSchema.safeParse(data);

    if (!parsed.success) {
      console.error('Data validation error:', parsed.error);
      throw new Error('Invalid business data format received');
    }

    return parsed.data;
  } catch (error) {
    console.error('Error fetching business data:', error);
    if (process.env.NODE_ENV === 'development') {
      console.log('Using fallback data due to fetch error');
      return FALLBACK_DATA;
    }
    throw error;
  }
};

export default function Home() {
  const { data: businessData, isLoading, error } = useQuery<BusinessData>({
    queryKey: ['business-data'],
    queryFn: getBusinessData,
    retry: false,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !businessData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h1>
          <p className="text-gray-600 mb-4">{error?.message || 'Failed to load business data'}</p>
          <p className="text-sm text-gray-500">
            Try refreshing the page or ensure you have a valid site ID in the URL.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Hero businessData={businessData} />
      <About businessData={businessData} />
      <Services businessData={businessData} />
      <Reviews businessData={businessData} />
      <Map businessData={businessData} />
      <Contact businessData={businessData} />
      <Footer businessData={businessData} />
    </div>
  );
}