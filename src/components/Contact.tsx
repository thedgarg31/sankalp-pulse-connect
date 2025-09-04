import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare,
  Send,
  CheckCircle
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Office",
    details: ["123 Insurance Plaza", "Financial District", "Mumbai, MH 400001"],
    color: "primary"
  },
  {
    icon: Phone,
    title: "Phone Support",
    details: ["+91 1800-SANKALP", "+91 1800-726-5257", "24/7 Emergency Claims"],
    color: "secondary"
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@sankalp.insurance", "claims@sankalp.insurance", "support@sankalp.insurance"],
    color: "accent"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 9:00 AM - 7:00 PM", "Sat: 10:00 AM - 4:00 PM", "24/7 Online Support"],
    color: "primary"
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Contact form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const gradientMap = {
    primary: "bg-gradient-primary",
    secondary: "bg-gradient-secondary",
    accent: "bg-gradient-accent"
  };

  return (
    <section id="contact" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MessageSquare className="h-4 w-4" />
            Get in Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            We're Here to Help
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our services? Need a custom quote? Our expert team 
            is ready to assist you with all your insurance needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="p-6 border-0 shadow-card hover:shadow-elegant transition-bounce">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${gradientMap[info.color as keyof typeof gradientMap]} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">{detail}</p>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 border-0 shadow-card">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Send us a Message</h3>
                <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Message Sent Successfully!</h4>
                  <p className="text-muted-foreground">Thank you for contacting us. We'll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="What can we help you with?"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <Button variant="hero" size="lg" type="submit" className="w-full">
                    <Send className="h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-6">Need Immediate Assistance?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="success" size="lg">
              <Phone className="h-5 w-5" />
              Call Now: 1800-SANKALP
            </Button>
            <Button variant="outline" size="lg">
              <MessageSquare className="h-5 w-5" />
              Start Live Chat
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;