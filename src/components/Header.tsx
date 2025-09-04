import { Shield, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoginModal from "@/components/LoginModal";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { logout } from "@/store/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm shadow-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-hero rounded-lg shadow-elegant">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Sankalp</h1>
            <p className="text-xs text-muted-foreground">Insurance Management</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-foreground hover:text-primary transition-smooth">
            Features
          </a>
          <a href="#solutions" className="text-foreground hover:text-primary transition-smooth">
            Solutions
          </a>
          <a href="#about" className="text-foreground hover:text-primary transition-smooth">
            About
          </a>
          <a href="#contact" className="text-foreground hover:text-primary transition-smooth">
            Contact
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {!user ? (
            <Button variant="ghost" size="sm" className="hidden md:inline-flex" onClick={() => setLoginOpen(true)}>
              <User className="h-4 w-4" />
              Login
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              Logout
            </Button>
          )}
          <Button variant="hero" size="sm">
            Get Started
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-card/95 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a href="#features" className="text-foreground hover:text-primary transition-smooth">
              Features
            </a>
            <a href="#solutions" className="text-foreground hover:text-primary transition-smooth">
              Solutions
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-smooth">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-smooth">
              Contact
            </a>
            <div className="flex gap-2 pt-2 border-t">
              <Button variant="ghost" size="sm" className="flex-1" onClick={() => setLoginOpen(true)}>
                Login
              </Button>
              <Button variant="hero" size="sm" className="flex-1">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </header>
  );
};

export default Header;