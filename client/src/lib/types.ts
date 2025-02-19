export interface BusinessData {
  basic_info: {
    name: string;
    city?: string;
    phone?: string;
    rating?: number;
    working_hours?: {
      [key: string]: string;
    };
    latitude?: number;
    longitude?: number;
  };
  five_star_reviews?: Array<{
    text: string;
    reviewer_name: string;
    date: string;
    rating: number;
  }>;
}
