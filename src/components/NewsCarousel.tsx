import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  image?: string;
}

const NewsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Champions League Final Set for Next Month",
      content: "The most anticipated football match of the year is approaching. Two powerhouse teams will clash in an epic showdown.",
      author: "John Smith",
      date: "2 hours ago"
    },
    {
      id: 2,
      title: "Tennis Tournament Registration Now Open",
      content: "Local tennis championship accepting registrations. Prize pool of $50,000 awaits the winners.",
      author: "Sarah Johnson",
      date: "4 hours ago"
    },
    {
      id: 3,
      title: "New Basketball Complex Opens Downtown",
      content: "State-of-the-art facility with 6 courts now available for booking. Professional training equipment included.",
      author: "Mike Wilson",
      date: "6 hours ago"
    },
    {
      id: 4,
      title: "Swimming Pool Maintenance Complete",
      content: "Olympic-sized pool reopens with improved filtration systems and new timing equipment.",
      author: "Lisa Brown",
      date: "8 hours ago"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [newsItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full bg-gradient-hero rounded-xl overflow-hidden shadow-medium">
      <div className="relative">
        {/* Header */}
        <div className="bg-primary/90 text-primary-foreground px-6 py-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            🏆 Latest Sports News
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative min-h-[300px] bg-background/95 backdrop-blur-sm">
          <div className="flex transition-transform duration-500 ease-in-out" 
               style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {newsItems.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0 p-6">
                <Card className="h-full bg-card/80 backdrop-blur-sm border-0 shadow-soft">
                  <CardContent className="p-6 h-full flex flex-col">
                    <h3 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground flex-1 mb-4 line-clamp-3">
                      {item.content}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{item.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 py-4 bg-background/95">
          {newsItems.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-primary scale-110' 
                  : 'bg-muted hover:bg-primary/50'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel;