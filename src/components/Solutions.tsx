import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Users, 
  Car, 
  Heart, 
  Home, 
  Briefcase,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const solutions = [
  {
    icon: Heart,
    title: "Life Insurance",
    description: "Comprehensive life coverage with flexible terms and competitive rates",
    features: ["Term Life", "Whole Life", "Universal Life", "Group Coverage"],
    color: "secondary"
  },
  {
    icon: Car,
    title: "Auto Insurance", 
    description: "Complete vehicle protection with 24/7 roadside assistance",
    features: ["Liability Coverage", "Collision", "Comprehensive", "Rental Car"],
    color: "accent"
  },
  {
    icon: Home,
    title: "Property Insurance",
    description: "Protect your home and belongings with comprehensive coverage",
    features: ["Homeowners", "Renters", "Condo", "Flood Protection"],
    color: "primary"
  },
  {
    icon: Briefcase,
    title: "Business Insurance",
    description: "Tailored solutions for businesses of all sizes",
    features: ["General Liability", "Professional", "Workers Comp", "Cyber Security"],
    color: "secondary"
  },
  {
    icon: Building2,
    title: "Commercial Lines",
    description: "Enterprise-level insurance solutions with dedicated support",
    features: ["Property", "Casualty", "Directors & Officers", "Employment Practices"],
    color: "accent"
  },
  {
    icon: Users,
    title: "Group Benefits",
    description: "Employee benefit packages that attract and retain talent",
    features: ["Health Plans", "Dental", "Vision", "Retirement Plans"],
    color: "primary"
  }
];

const Solutions = () => {
  const gradientMap = {
    primary: "bg-gradient-primary",
    secondary: "bg-gradient-secondary",
    accent: "bg-gradient-accent"
  };

  return (
    <section id="solutions" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Building2 className="h-4 w-4" />
            Insurance Solutions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Coverage for Every Need
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From personal protection to enterprise solutions, we offer a complete range 
            of insurance products designed to safeguard what matters most to you.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            
            return (
              <Card 
                key={index} 
                className="p-6 hover:shadow-elegant transition-bounce group cursor-pointer border-0 shadow-card"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 ${gradientMap[solution.color as keyof typeof gradientMap]} rounded-xl flex items-center justify-center group-hover:scale-110 transition-bounce`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">
                      {solution.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {solution.description}
                    </p>
                    
                    <div className="space-y-2">
                      {solution.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-secondary" />
                          <span className="text-slate-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="group/btn p-0 h-auto font-medium"
                      onClick={() => {
                        const event = new CustomEvent('openLogin');
                        window.dispatchEvent(event);
                      }}
                    >
                      Get Quote 
                      <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-card rounded-2xl p-8 shadow-card">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Need a Custom Solution?
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Our expert team can design a tailored insurance package that meets your specific needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => window.location.href = '#contact'}
            >
              Get Custom Quote
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                const event = new CustomEvent('openLogin');
                window.dispatchEvent(event);
              }}
            >
              Speak to an Expert
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;