import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import type { BusinessData } from "@shared/schema";

interface ReviewsProps {
  businessData: BusinessData;
}

export function Reviews({ businessData }: ReviewsProps) {
  const reviews = businessData.five_star_reviews || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // No reviews, no component
  if (reviews.length === 0) {
    return null;
  }

  // Determine how many reviews to show based on screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      updateVisibleReviews(activeIndex, mobile);
    };

    const updateVisibleReviews = (index: number, mobile: boolean) => {
      if (mobile) {
        setVisibleReviews([index]);
      } else {
        // On desktop, show 3 reviews or fewer if we don't have enough
        const startIdx = index;
        const endIdx = Math.min(startIdx + 2, reviews.length - 1);
        const indices = [];

        for (let i = startIdx; i <= endIdx; i++) {
          indices.push(i);
        }

        // If we have fewer than 3 reviews to show, add from the beginning
        if (indices.length < 3 && reviews.length >= 3) {
          for (let i = 0; indices.length < 3; i++) {
            if (!indices.includes(i)) {
              indices.push(i);
            }
          }
        }

        setVisibleReviews(indices);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, [activeIndex, reviews.length]);

  // Navigation handlers
  const handlePrevious = () => {
    const newIndex = activeIndex === 0 ? reviews.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex === reviews.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };

  // Generate star ratings
  const renderStars = (count = 5) => {
    return Array(count).fill(0).map((_, i) => (
      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
    ));
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-900 to-indigo-800 py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-400 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-indigo-500 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-purple-500 blur-3xl" />
      </div>

      {/* Content container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Read honest feedback from our valued customers about their experiences with our services.
          </p>
        </div>

        {/* Reviews carousel */}
        <div className="relative">
          {/* Navigation buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8 z-10">
            <Button 
              onClick={handlePrevious}
              variant="ghost" 
              size="icon"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 md:w-12 md:h-12 text-white shadow-lg"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8 z-10">
            <Button 
              onClick={handleNext}
              variant="ghost" 
              size="icon"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 md:w-12 md:h-12 text-white shadow-lg"
              aria-label="Next review"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Review cards */}
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-6`}>
            {visibleReviews.map((index) => {
              const review = reviews[index];
              return (
                <Card 
                  key={index}
                  className="bg-white/95 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden transform transition-all duration-500"
                >
                  {/* Card header with quote icon and rating */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                    <div className="flex justify-between items-center">
                      <Quote className="h-8 w-8 text-white/80" />
                      <div className="flex">
                        {renderStars()}
                      </div>
                    </div>
                  </div>

                  {/* Card body with review content */}
                  <div className="p-6">
                    <p className="text-gray-700 mb-6 italic">
                      "{review.text}"
                    </p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-4 border-t border-gray-100">
                      <span className="font-semibold text-gray-900">
                        {review.reviewer_name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Pagination indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 
                  ${activeIndex === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'}`}
                aria-label={`Go to review ${index + 1}`}
                aria-current={activeIndex === index ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>

        {/* CTA button */}
        {reviews.length > 3 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="bg-white text-indigo-800 hover:bg-blue-50 px-6 py-2 rounded-full transition-all duration-300 font-medium"
            >
              View All {reviews.length} Reviews
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}