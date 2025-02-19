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

  // Water pattern SVG encoded as base64
  const waterPatternSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="white" fill-opacity="0.05"/>
      <path d="M20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30Z" fill="white" fill-opacity="0.08"/>
    </svg>
  `;

  return (
    <section className="relative bg-gradient-to-r from-[#0A2F73] to-[#1E5799] py-20 md:py-40 overflow-hidden">
      {/* Water pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml;base64,${btoa(waterPatternSvg)}")`,
          backgroundRepeat: 'repeat',
          animation: 'float 20s linear infinite'
        }}
      />

      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 relative">
          What Our Customers Say
        </h2>

        <div className="relative">
          {useCarousel && (
            <>
              <Button
                variant="ghost"
                className="absolute left-0 top-1/2 -translate-y-1/2 text-white z-10 opacity-75 hover:opacity-100 transition-opacity"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white z-10 opacity-75 hover:opacity-100 transition-opacity"
                onClick={handleNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}

          <div className="flex flex-nowrap overflow-hidden">
            {reviews.slice(currentIndex, currentIndex + (useCarousel ? 1 : 2)).map((review, index) => (
              <Card 
                key={index} 
                className="flex-shrink-0 w-full md:w-1/2 p-8 mx-4 bg-white/95 backdrop-blur-sm shadow-xl transition-transform duration-500"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  animation: `fadeSlideIn 0.7s ease-out ${index * 0.2}s backwards`
                }}
              >
                <Quote className="h-12 w-12 text-gray-200 mb-4" />
                <p className="text-gray-700 mb-6 relative">
                  {review.text}
                </p>
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
              className="bg-white hover:bg-gray-100 transition-transform hover:scale-105"
            >
              Read All Reviews
            </Button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes float {
          from { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          to { transform: translateY(0); }
        }

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}