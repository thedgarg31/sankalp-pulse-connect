import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Solutions from "@/components/Solutions";
import About from "@/components/About";
import Contact from "@/components/Contact";
import LoginModal from "@/components/LoginModal";
import ChatModal from "@/components/ChatModal";
import { InsuranceAds } from "@/components/InsuranceAds";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Index = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    // Listen for custom events to open modals
    const handleOpenLogin = () => setLoginOpen(true);
    const handleOpenChat = () => setChatOpen(true);
    
    window.addEventListener('openLogin', handleOpenLogin);
    window.addEventListener('openChat', handleOpenChat);
    
    return () => {
      window.removeEventListener('openLogin', handleOpenLogin);
      window.removeEventListener('openChat', handleOpenChat);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Features />
      
      {/* Solutions Section */}
      <Solutions />
      
      {/* Insurance Ads & Offers */}
      <InsuranceAds />
      
      {/* About Section */}
      <About />
      
      {/* Contact Section */}
      <Contact />

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      
      {/* Chat Now Button */}
      <Button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      
      <ChatModal open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
};

export default Index;
