import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Header } from "@/components/Header";
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

// Helper function to safely convert to number
function safeParseFloat(value: any): number | undefined {
  if (value === undefined || value === null) return undefined;

  if (typeof value === 'number') return value;

  if (typeof value === 'string') {
    // Remove any non-numeric characters except decimal point
    const cleanedValue = value.replace(/[^\d.]/g, '');
    const parsed = parseFloat(cleanedValue);

    // If parsing results in NaN, return undefined instead
    return !isNaN(parsed) ? parsed : undefined;
  }

  return undefined;
}

// Helper function to safely parse JSON string
function safeParseJSON(jsonString: any): any {
  if (typeof jsonString !== 'string') return jsonString;

  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.warn('Failed to parse JSON string:', jsonString);
    return {};
  }
}

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
      `https://raw.githubusercontent.com/atlasgrowth/Arkansasplumbers/main/data/processed/businesses/${siteId}.json`
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Business data not found for site ID: ${siteId}, using fallback data`);
        return FALLBACK_DATA;
      }
      throw new Error(`Failed to load business data: ${response.status}`);
    }

    const rawData = await response.json();
    console.log('Raw data from API:', rawData);

    // Handle missing basic_info
    if (!rawData.basic_info) {
      console.warn('Missing basic_info in response, using fallback');
      return FALLBACK_DATA;
    }

    // Normalize data types before validation
    const normalizedData = {
      ...rawData,
      basic_info: {
        ...rawData.basic_info,
        // Safely convert rating to number
        rating: safeParseFloat(rawData.basic_info.rating),

        // Safely parse working_hours
        working_hours: safeParseJSON(rawData.basic_info.working_hours),

        // Safely convert coordinates 
        latitude: safeParseFloat(rawData.basic_info.latitude),
        longitude: safeParseFloat(rawData.basic_info.longitude),
      }
    };

    console.log('Normalized data:', normalizedData);
    const parsed = businessDataSchema.safeParse(normalizedData);

    if (!parsed.success) {
      console.error('Data validation error:', parsed.error);
      console.error('Problematic data:', normalizedData);

      // If we're in development, return fallback data instead of throwing
      if (process.env.NODE_ENV === 'development') {
        console.warn('Using fallback data due to validation error');
        return FALLBACK_DATA;
      }

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
      <Header businessData={businessData} />
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