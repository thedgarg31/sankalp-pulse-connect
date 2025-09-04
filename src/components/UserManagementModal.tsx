import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { 
  Users, 
  Shield, 
  UserCheck, 
  Crown, 
  Search,
  Phone,
  Mail,
  Calendar,
  MapPin,
  FileText
} from "lucide-react";
import { mockCustomers, mockUsers, emailRoleMap } from "@/services/mockData";

interface UserManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Extended user data with more details
const extendedUsers = [
  ...mockUsers.map(user => ({
    ...user,
    email: `${user.username}@example.com`,
    phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    joinDate: '2024-01-15',
    lastActive: '2024-01-20',
    status: 'active',
    department: user.role === 'admin' ? 'Management' : user.role === 'agent' ? 'Sales' : 'Operations',
    location: 'Mumbai, India'
  })),
  ...mockCustomers.map(customer => ({
    id: customer.id + 1000,
    username: customer.name.split(' ')[0].toLowerCase(),
    role: 'customer' as const,
    email: customer.email,
    phone: customer.phone,
    joinDate: '2024-01-10',
    lastActive: '2024-01-19',
    status: 'active',
    department: 'Customer',
    location: 'Delhi, India'
  }))
];

export const UserManagementModal = ({ open, onOpenChange }: UserManagementModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = extendedUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'agent': return <UserCheck className="h-4 w-4 text-blue-500" />;
      case 'clerk': return <FileText className="h-4 w-4 text-green-500" />;
      case 'customer': return <Users className="h-4 w-4 text-purple-500" />;
      default: return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: "destructive",
      agent: "default",
      clerk: "secondary",
      customer: "outline",
    } as const;
    
    return (
      <Badge variant={variants[role as keyof typeof variants] || "outline"}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  const userColumns = [
    { 
      key: 'username', 
      label: 'Name',
      render: (value: string, row: any) => (
        <div className="flex items-center gap-2">
          {getRoleIcon(row.role)}
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { 
      key: 'role', 
      label: 'Role',
      render: (value: string) => getRoleBadge(value)
    },
    { key: 'department', label: 'Department' },
    { key: 'location', label: 'Location' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'active' ? 'default' : 'secondary'}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      )
    },
    { key: 'lastActive', label: 'Last Active' }
  ];

  const getStatsByRole = () => {
    const stats = extendedUsers.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(stats).map(([role, count]) => ({
      role,
      count,
      percentage: Math.round((count / extendedUsers.length) * 100)
    }));
  };

  const roleStats = getStatsByRole();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            User Management
            <Badge variant="outline" className="ml-auto">
              {extendedUsers.length} Total Users
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search */}
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {roleStats.map((stat) => (
              <Card key={stat.role}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    {getRoleIcon(stat.role)}
                    {stat.role.charAt(0).toUpperCase() + stat.role.slice(1)}s
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.count}</div>
                  <div className="text-xs text-muted-foreground">{stat.percentage}% of total</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="admins">Admins</TabsTrigger>
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="employees">Employees</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable 
                    columns={userColumns} 
                    data={filteredUsers}
                    onView={(row) => {
                      // Open detailed user view
                      console.log('View user:', row);
                    }}
                    onEdit={(row) => {
                      // Open edit user modal
                      console.log('Edit user:', row);
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admins" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Administrators</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable 
                    columns={userColumns} 
                    data={filteredUsers.filter(u => u.role === 'admin')}
                    onView={(row) => console.log('View admin:', row)}
                    onEdit={(row) => console.log('Edit admin:', row)}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Agents & Brokers</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable 
                    columns={userColumns} 
                    data={filteredUsers.filter(u => u.role === 'agent')}
                    onView={(row) => console.log('View agent:', row)}
                    onEdit={(row) => console.log('Edit agent:', row)}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="employees" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Employees</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable 
                    columns={userColumns} 
                    data={filteredUsers.filter(u => u.role === 'clerk')}
                    onView={(row) => console.log('View employee:', row)}
                    onEdit={(row) => console.log('Edit employee:', row)}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable 
                    columns={userColumns} 
                    data={filteredUsers.filter(u => u.role === 'customer')}
                    onView={(row) => console.log('View customer:', row)}
                    onEdit={(row) => console.log('Edit customer:', row)}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
