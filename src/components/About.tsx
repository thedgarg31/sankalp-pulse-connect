import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Shield, 
  Award, 
  Users, 
  TrendingUp, 
  Clock, 
  Globe,
  Target,
  Heart
} from "lucide-react";

const stats = [
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: Shield, value: "5M+", label: "Claims Processed" },
  { icon: Award, value: "25+", label: "Years Experience" },
  { icon: Globe, value: "100+", label: "Cities Served" }
];

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Accurate risk assessment and tailored coverage solutions"
  },
  {
    icon: Heart,
    title: "Care",
    description: "Compassionate support when you need it most"
  },
  {
    icon: Shield,
    title: "Security",
    description: "Robust protection backed by financial strength"
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description: "Evolving with your changing needs and aspirations"
  }
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="h-4 w-4" />
            About Sankalp
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Building Trust Since 1999
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            For over two decades, Sankalp has been protecting families and businesses 
            with innovative insurance solutions and unwavering commitment to excellence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Story */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Our Story</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded with a simple mission - to make insurance accessible, transparent, 
                and truly protective - Sankalp began as a small family-owned agency with 
                big dreams and bigger hearts.
              </p>
              <p>
                Today, we've grown into a technology-forward insurance leader, serving 
                over 50,000 customers across 100+ cities while maintaining the personal 
                touch and trust that built our reputation.
              </p>
              <p>
                Our motto "Together Towards a Secure Future" reflects our commitment to 
                walking alongside our customers through life's uncertainties, providing 
                not just coverage, but peace of mind.
              </p>
            </div>
            <Button variant="hero" size="lg">
              <Clock className="h-5 w-5" />
              Our Timeline
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 text-center border-0 shadow-card hover:shadow-elegant transition-bounce">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">Our Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              const colors = ["primary", "secondary", "accent", "primary"];
              const gradientMap = {
                primary: "bg-gradient-primary",
                secondary: "bg-gradient-secondary",
                accent: "bg-gradient-accent"
              };
              
              return (
                <Card key={index} className="p-6 text-center border-0 shadow-card hover:shadow-elegant transition-bounce group">
                  <div className={`w-12 h-12 ${gradientMap[colors[index] as keyof typeof gradientMap]} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-bounce`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Leadership CTA */}
        <div className="text-center bg-gradient-hero rounded-2xl p-8 text-primary-foreground">
          <h3 className="text-2xl font-bold mb-4">Meet Our Leadership Team</h3>
          <p className="mb-6 opacity-90 max-w-2xl mx-auto">
            Experienced professionals dedicated to innovation, integrity, and your success.
          </p>
          <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            View Leadership
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;