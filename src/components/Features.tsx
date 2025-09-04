import { Card } from "@/components/ui/card";
import { 
  Shield, 
  Zap, 
  BarChart3, 
  FileCheck, 
  Clock, 
  Users,
  Brain,
  Smartphone,
  Lock
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Advanced Security",
    description: "Enterprise-grade security with end-to-end encryption and compliance standards",
    color: "primary"
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Instant policy updates, claim processing, and notifications across all platforms",
    color: "accent"
  },
  {
    icon: Brain,
    title: "AI-Powered Insights", 
    description: "Smart analytics for fraud detection, risk assessment, and predictive modeling",
    color: "secondary"
  },
  {
    icon: FileCheck,
    title: "Document Intelligence",
    description: "OCR technology for automatic form filling and document verification",
    color: "primary"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive dashboards with drill-down capabilities and custom reports",
    color: "accent"
  },
  {
    icon: Users,
    title: "Multi-Role Access",
    description: "Granular permissions for customers, agents, employees, and administrators",
    color: "secondary"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Progressive web app with offline capabilities and push notifications",
    color: "primary"
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Round-the-clock system availability with 99.9% uptime guarantee",
    color: "accent"
  },
  {
    icon: Lock,
    title: "Compliance Ready",
    description: "Built-in compliance tools for regulatory requirements and audit trails",
    color: "secondary"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for Modern Insurance Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From AI-powered insights to real-time processing, our comprehensive platform 
            handles every aspect of insurance operations with precision and efficiency.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const gradientMap = {
              primary: "bg-gradient-primary",
              secondary: "bg-gradient-secondary", 
              accent: "bg-gradient-accent"
            };
            
            return (
              <Card 
                key={index} 
                className="p-6 hover:shadow-elegant transition-bounce group cursor-pointer border-0 shadow-card"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 ${gradientMap[feature.color as keyof typeof gradientMap]} rounded-xl flex items-center justify-center group-hover:scale-110 transition-bounce`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;