import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, ShoppingCart, MapPin, Star, Clock } from 'lucide-react';
import NewsCarousel from '@/components/NewsCarousel';
import heroImage from '@/assets/hero-sports.jpg';

const Home = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Book Sports Grounds',
      description: 'Reserve courts, fields, and complexes for your games',
      link: '/book-ground',
      color: 'text-primary'
    },
    {
      icon: User,
      title: 'Hire Professional Coaches',
      description: 'Train with certified coaches for all sports',
      link: '/book-coach',
      color: 'text-accent'
    },
    {
      icon: ShoppingCart,
      title: 'Sports Equipment Shop',
      description: 'Buy quality gear from trusted brands',
      link: '/shop',
      color: 'text-primary'
    }
  ];

  const popularVenues = [
    {
      name: 'City Sports Complex',
      type: 'Multi-Sport',
      rating: 4.9,
      price: '$25/hour',
      image: '🏟️'
    },
    {
      name: 'Tennis Center Pro',
      type: 'Tennis Courts',
      rating: 4.8,
      price: '$30/hour',
      image: '🎾'
    },
    {
      name: 'Basketball Arena',
      type: 'Basketball',
      rating: 4.7,
      price: '$20/hour',
      image: '🏀'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-hero flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Your Ultimate <span className="text-primary-glow">Sports Hub</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Book grounds, hire coaches, buy equipment, and stay updated with the latest sports news
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-strong">
              <Calendar className="mr-2 h-5 w-5" />
              Book Now
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              Explore Sports
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Sports
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From booking facilities to finding coaches and buying equipment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-card-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-6">
                    {feature.description}
                  </p>
                  <Button asChild className="w-full bg-gradient-primary">
                    <Link to={feature.link}>
                      Get Started
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Latest Sports News
            </h2>
            <p className="text-muted-foreground text-lg">
              Stay updated with the latest happenings in the sports world
            </p>
          </div>
          <NewsCarousel />
        </div>
      </section>

      {/* Popular Venues */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Venues
            </h2>
            <p className="text-muted-foreground text-lg">
              Book your favorite sports facilities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {popularVenues.map((venue, index) => (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{venue.image}</div>
                    <h3 className="text-xl font-bold text-card-foreground">{venue.name}</h3>
                    <p className="text-muted-foreground">{venue.type}</p>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{venue.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary font-bold">
                      <Clock className="h-4 w-4" />
                      <span>{venue.price}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-primary">
                    <MapPin className="mr-2 h-4 w-4" />
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;