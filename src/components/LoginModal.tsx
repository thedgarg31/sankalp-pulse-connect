import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppStore";
import { loginSuccess, type UserRole } from "@/store/authSlice";
import { emailRoleMap } from "@/services/mockData";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Shield, 
  Users, 
  UserCheck, 
  Crown, 
  Briefcase,
  Eye,
  EyeOff 
} from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const userRoles = [
  {
    id: "customer",
    title: "Customer",
    description: "Access your policies and claims",
    icon: Users,
    color: "primary"
  },
  {
    id: "agent",
    title: "Agent/Broker", 
    description: "Manage client policies",
    icon: UserCheck,
    color: "secondary"
  },
  {
    id: "employee",
    title: "Employee",
    description: "Process claims and tasks",
    icon: Briefcase,
    color: "accent"
  },
  {
    id: "admin",
    title: "Administrator",
    description: "Full system access", 
    icon: Crown,
    color: "primary"
  }
];

const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    
    const role = selectedRole as UserRole;
    const email = credentials.email.toLowerCase();
    
    // Check if email is mapped to a specific role
    const mappedRole = emailRoleMap[email];
    
    if (mappedRole && mappedRole !== role) {
      toast.error(`This email is registered as ${mappedRole}. Please select the correct role.`);
      return;
    }
    
    // For demo purposes, allow login with any email if not in the mapping
    dispatch(loginSuccess({ email: credentials.email, role }));
    const roleRoutes: Record<UserRole, string> = {
      customer: "/customer-dashboard",
      employee: "/employee-dashboard",
      agent: "/broker-dashboard",
      admin: "/admin-dashboard"
    };
    onOpenChange(false);
    navigate(roleRoutes[role]);
    toast.success(`Welcome! Logged in as ${role}`);
  };

  const gradientMap = {
    primary: "bg-gradient-primary",
    secondary: "bg-gradient-secondary",
    accent: "bg-gradient-accent"
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <DialogTitle>Welcome to Sankalp</DialogTitle>
              <DialogDescription>
                Choose your role and sign in to continue
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {!selectedRole ? (
            /* Role Selection */
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Select Your Role</h3>
              <div className="grid grid-cols-2 gap-3">
                {userRoles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <Card
                      key={role.id}
                      className="p-4 cursor-pointer hover:shadow-elegant transition-bounce border-2 hover:border-primary/50"
                      onClick={() => handleRoleSelect(role.id)}
                    >
                      <div className="text-center space-y-2">
                        <div className={`w-10 h-10 ${gradientMap[role.color as keyof typeof gradientMap]} rounded-lg flex items-center justify-center mx-auto`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-foreground">{role.title}</div>
                          <div className="text-xs text-muted-foreground">{role.description}</div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">
                  Sign in as {userRoles.find(r => r.id === selectedRole)?.title}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRole(null)}
                  type="button"
                >
                  Change Role
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <Button variant="hero" className="w-full" type="submit">
                Sign In
              </Button>
              
              <div className="text-center">
                <Button variant="link" size="sm" type="button">
                  Forgot Password?
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;