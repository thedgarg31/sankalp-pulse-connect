import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Percent, 
  Gift, 
  Shield, 
  Clock, 
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
  Heart,
  Car,
  Home,
  Plane
} from "lucide-react";

const insuranceAds = [
  {
    id: 1,
    type: "coupon",
    title: "New Year Special",
    discount: "20% OFF",
    description: "Get 20% discount on all new policies",
    validUntil: "31 Jan 2025",
    icon: Percent,
    color: "bg-red-500",
    features: ["Life Insurance", "Health Insurance", "Auto Insurance"],
    code: "NEWYEAR20"
  },
  {
    id: 2,
    type: "offer",
    title: "Family Protection Plan",
    discount: "Free Health Checkup",
    description: "Comprehensive family coverage with free health screening",
    validUntil: "15 Feb 2025",
    icon: Heart,
    color: "bg-pink-500",
    features: ["Family Health", "Dental Coverage", "Vision Care"],
    code: "FAMILY2025"
  },
  {
    id: 3,
    type: "promotion",
    title: "Auto Insurance Deal",
    discount: "₹5,000 Cashback",
    description: "Get instant cashback on your car insurance renewal",
    validUntil: "28 Feb 2025",
    icon: Car,
    color: "bg-blue-500",
    features: ["Zero Depreciation", "Roadside Assistance", "Engine Protection"],
    code: "AUTO5000"
  },
  {
    id: 4,
    type: "limited",
    title: "Travel Insurance",
    discount: "50% OFF",
    description: "Secure your travels with our premium travel insurance",
    validUntil: "10 Mar 2025",
    icon: Plane,
    color: "bg-purple-500",
    features: ["Medical Emergency", "Trip Cancellation", "Baggage Loss"],
    code: "TRAVEL50"
  }
];

const quickOffers = [
  {
    title: "Instant Quote",
    description: "Get your insurance quote in 2 minutes",
    icon: Zap,
    action: "Get Quote"
  },
  {
    title: "Claim in 24hrs",
    description: "Fastest claim processing guaranteed",
    icon: Clock,
    action: "File Claim"
  },
  {
    title: "5-Star Rating",
    description: "Rated excellent by 10,000+ customers",
    icon: Star,
    action: "Read Reviews"
  }
];

export const InsuranceAds = () => {
  const handleCouponClick = (coupon: any) => {
    // Copy coupon code to clipboard
    navigator.clipboard.writeText(coupon.code);
    alert(`Coupon code "${coupon.code}" copied to clipboard!`);
  };

  const handleActionClick = (action: string) => {
    // Navigate to appropriate dashboard or page
    switch (action) {
      case "Get Quote":
        window.location.href = "#contact";
        break;
      case "File Claim":
        // Open login modal or redirect to customer dashboard
        const event = new CustomEvent('openLogin');
        window.dispatchEvent(event);
        break;
      case "Read Reviews":
        window.open('https://www.google.com/search?q=sankalp+insurance+reviews', '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Gift className="h-4 w-4" />
            Special Offers & Deals
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Don't Miss These Amazing Insurance Deals!
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Limited time offers on our most popular insurance products. 
            Save big while securing your future.
          </p>
        </div>

        {/* Main Offers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {insuranceAds.map((ad) => {
            const Icon = ad.icon;
            return (
              <Card key={ad.id} className="relative overflow-hidden border-0 shadow-card hover:shadow-elegant transition-all duration-300 group cursor-pointer">
                <div className={`absolute top-0 right-0 ${ad.color} text-white px-3 py-1 text-xs font-bold rounded-bl-lg`}>
                  {ad.type.toUpperCase()}
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 ${ad.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-foreground">{ad.title}</CardTitle>
                      <p className="text-sm text-slate-600">Valid until {ad.validUntil}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{ad.discount}</div>
                    <p className="text-sm text-slate-600">{ad.description}</p>
                  </div>

                  <div className="space-y-2">
                    {ad.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                      <span className="text-sm font-mono text-foreground">{ad.code}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleCouponClick(ad)}
                        className="h-6 px-2 text-xs"
                      >
                        Copy
                      </Button>
                    </div>
                  </div>

                  <Button 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    variant="outline"
                    onClick={() => handleCouponClick(ad)}
                  >
                    Use This Offer
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          {quickOffers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <Card key={index} className="p-6 text-center border-0 shadow-card hover:shadow-elegant transition-bounce group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{offer.title}</h3>
                <p className="text-slate-600 mb-4">{offer.description}</p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleActionClick(offer.action)}
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  {offer.action}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-hero rounded-2xl p-8 text-primary-foreground">
            <h3 className="text-2xl font-bold mb-4">Ready to Save on Your Insurance?</h3>
            <p className="mb-6 opacity-90 max-w-2xl mx-auto">
              Don't wait! These offers are limited time only. Get your personalized quote today 
              and start saving on your insurance premiums.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => window.location.href = '#contact'}
              >
                Get Free Quote
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => {
                  const event = new CustomEvent('openLogin');
                  window.dispatchEvent(event);
                }}
              >
                View My Policies
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
