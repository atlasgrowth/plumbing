import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { BusinessData } from "@shared/schema";

interface ReviewsProps {
  businessData: BusinessData;
}

export function Reviews({ businessData }: ReviewsProps) {
  const reviews = businessData.five_star_reviews || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (reviews.length === 0) {
    return null;
  }

  const useCarousel = reviews.length >= 3;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-gradient-to-r from-[#0A2F73] to-[#1E5799] py-20 md:py-40">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          What Our Customers Say
        </h2>

        <div className="relative">
          {useCarousel && (
            <>
              <Button
                variant="ghost"
                className="absolute left-0 top-1/2 -translate-y-1/2 text-white z-10"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white z-10"
                onClick={handleNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}

          <div className="flex flex-nowrap overflow-hidden">
            {reviews.slice(currentIndex, currentIndex + (useCarousel ? 1 : 2)).map((review, index) => (
              <Card key={index} className="flex-shrink-0 w-full md:w-1/2 p-8 mx-4 bg-white">
                <Quote className="h-12 w-12 text-gray-200 mb-4" />
                <p className="text-gray-700 mb-6">{review.text}</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{review.reviewer_name}</span>
                  <span className="text-gray-500">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {reviews.length >= 5 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="bg-white hover:bg-gray-100"
            >
              Read All Reviews
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
