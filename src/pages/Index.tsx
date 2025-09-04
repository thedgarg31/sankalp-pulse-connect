import { useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Solutions from "@/components/Solutions";
import About from "@/components/About";
import Contact from "@/components/Contact";
import LoginModal from "@/components/LoginModal";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Features />
      
      {/* Solutions Section */}
      <Solutions />
      
      {/* About Section */}
      <About />
      
      {/* Contact Section */}
      <Contact />
      
      {/* Quick Login Demo */}
      <section className="py-16 bg-gradient-subtle border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Experience Sankalp Today
          </h2>
          <p className="text-muted-foreground mb-6">
            Try our demo to see how our insurance management system works
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => setLoginOpen(true)}
          >
            Try Demo Login
          </Button>
        </div>
      </section>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  );
};

export default Index;
