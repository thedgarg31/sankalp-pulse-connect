import { useState } from "react";
import { useAppSelector } from "@/hooks/useAppStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PolicyModal } from "@/components/PolicyModal";
import { ClaimModal } from "@/components/ClaimModal";
import { NewClaimModal } from "@/components/NewClaimModal";
import { UserManagementModal } from "@/components/UserManagementModal";
import { toast } from "sonner";
import { 
  Users, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  Car, 
  Heart, 
  Plane,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign
} from "lucide-react";
import { 
  mockCustomers, 
  mockPolicies, 
  mockClaims, 
  getDashboardStats, 
  getPolicyTypeStats, 
  getClaimStatusStats,
  getRecentClaims,
  getTopPolicies,
  type Claim,
  type Policy,
  type Customer
} from "@/services/mockData";

export const CustomerDashboard = () => {
  const user = useAppSelector((s) => s.auth.user);
  const customerPolicies = mockPolicies.slice(0, 3);
  const customerClaims = mockClaims.slice(0, 2);
  
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [newClaimModalOpen, setNewClaimModalOpen] = useState(false);
  
  const policyColumns = [
    { key: 'policy_name', label: 'Policy Name' },
    { key: 'type', label: 'Type' },
    { key: 'premium', label: 'Premium' },
    { key: 'coverage_amount', label: 'Coverage' },
    { key: 'status', label: 'Status' }
  ];

  const claimColumns = [
    { key: 'policy_name', label: 'Policy' },
    { key: 'claim_amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'submitted_date', label: 'Submitted' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.email}</h1>
          <p className="text-muted-foreground">Manage your insurance policies and claims</p>
        </div>
        <Button onClick={() => setNewClaimModalOpen(true)}>New Claim</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Policies"
          value={customerPolicies.length}
          icon={Shield}
          description="Your insurance coverage"
        />
        <StatCard
          title="Total Claims"
          value={customerClaims.length}
          icon={FileText}
          description="Claims submitted"
        />
        <StatCard
          title="Pending Claims"
          value={customerClaims.filter(c => c.status === 'pending').length}
          icon={Clock}
          description="Awaiting approval"
        />
        <StatCard
          title="Total Coverage"
          value={`₹${customerPolicies.reduce((sum, p) => sum + p.coverage_amount, 0).toLocaleString()}`}
          icon={DollarSign}
          description="Insurance protection"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={policyColumns} 
              data={customerPolicies.map(p => ({ ...p, status: 'active' }))}
              onView={(row) => {
                setSelectedPolicy(row);
                setPolicyModalOpen(true);
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={claimColumns} 
              data={customerClaims}
              onView={(row) => {
                setSelectedClaim(row);
                setClaimModalOpen(true);
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      <PolicyModal 
        open={policyModalOpen}
        onOpenChange={setPolicyModalOpen}
        policy={selectedPolicy}
      />
      
      <ClaimModal 
        open={claimModalOpen}
        onOpenChange={setClaimModalOpen}
        claim={selectedClaim}
        mode="view"
      />
      
      <NewClaimModal 
        open={newClaimModalOpen}
        onOpenChange={setNewClaimModalOpen}
      />
    </div>
  );
};

export const EmployeeDashboard = () => {
  const stats = getDashboardStats();
  const recentClaims = getRecentClaims();
  const claimStatusStats = getClaimStatusStats();
  
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [claimModalOpen, setClaimModalOpen] = useState(false);

  const claimColumns = [
    { key: 'customer_name', label: 'Customer' },
    { key: 'policy_name', label: 'Policy' },
    { key: 'claim_amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'submitted_date', label: 'Submitted' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Employee Dashboard</h1>
        <p className="text-muted-foreground">Process claims and manage customer requests</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Claims"
          value={stats.totalClaims}
          icon={FileText}
          description="All claims processed"
        />
        <StatCard
          title="Pending Claims"
          value={stats.pendingClaims}
          icon={Clock}
          description="Awaiting review"
        />
        <StatCard
          title="Approved Claims"
          value={stats.approvedClaims}
          icon={CheckCircle}
          description="Successfully processed"
        />
        <StatCard
          title="Rejected Claims"
          value={stats.rejectedClaims}
          icon={XCircle}
          description="Not approved"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Claim Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {claimStatusStats.map((stat) => (
                <div key={stat.status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant={stat.status === 'Approved' ? 'default' : stat.status === 'Pending' ? 'secondary' : 'destructive'}>
                      {stat.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{stat.count}</div>
                    <div className="text-sm text-muted-foreground">{stat.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Claims to Process</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={claimColumns} 
              data={recentClaims}
              onView={(row) => {
                setSelectedClaim(row);
                setClaimModalOpen(true);
              }}
              onEdit={(row) => {
                setSelectedClaim(row);
                setClaimModalOpen(true);
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      <ClaimModal 
        open={claimModalOpen}
        onOpenChange={setClaimModalOpen}
        claim={selectedClaim}
        mode="edit"
        onEdit={(claim, updates) => {
          toast.success(`Claim ${claim.id} updated successfully!`);
          setClaimModalOpen(false);
        }}
      />
    </div>
  );
};

export const AgentDashboard = () => {
  const stats = getDashboardStats();
  const policyTypeStats = getPolicyTypeStats();
  const topPolicies = getTopPolicies();
  
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);

  const policyColumns = [
    { key: 'policy_name', label: 'Policy Name' },
    { key: 'type', label: 'Type' },
    { key: 'premium', label: 'Premium' },
    { key: 'coverage_amount', label: 'Coverage' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Agent Dashboard</h1>
        <p className="text-muted-foreground">Manage client policies and sales performance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={Users}
          description="Active clients"
        />
        <StatCard
          title="Policies Sold"
          value={stats.totalPolicies}
          icon={Shield}
          description="This month"
        />
        <StatCard
          title="Total Premium"
          value={`₹${stats.totalPremium.toLocaleString()}`}
          icon={DollarSign}
          description="Monthly collection"
        />
        <StatCard
          title="Commission Earned"
          value={`₹${(stats.totalPremium * 0.1).toLocaleString()}`}
          icon={TrendingUp}
          description="10% commission"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Policy Types Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {policyTypeStats.map((stat) => (
                <div key={stat.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {stat.type === 'Health' && <Heart className="h-4 w-4 text-red-500" />}
                    {stat.type === 'Life' && <Shield className="h-4 w-4 text-blue-500" />}
                    {stat.type === 'Car' && <Car className="h-4 w-4 text-green-500" />}
                    {stat.type === 'Travel' && <Plane className="h-4 w-4 text-purple-500" />}
                    <span className="font-medium">{stat.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{stat.count}</div>
                    <div className="text-sm text-muted-foreground">{stat.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={policyColumns} 
              data={topPolicies}
              onView={(row) => {
                setSelectedPolicy(row);
                setPolicyModalOpen(true);
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      <PolicyModal 
        open={policyModalOpen}
        onOpenChange={setPolicyModalOpen}
        policy={selectedPolicy}
        onEdit={(policy) => {
          toast.success(`Policy ${policy.policy_name} updated successfully!`);
          setPolicyModalOpen(false);
        }}
      />
    </div>
  );
};

export const AdminDashboard = () => {
  const stats = getDashboardStats();
  const policyTypeStats = getPolicyTypeStats();
  const claimStatusStats = getClaimStatusStats();
  const recentClaims = getRecentClaims();
  
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [userManagementOpen, setUserManagementOpen] = useState(false);

  const claimColumns = [
    { key: 'customer_name', label: 'Customer' },
    { key: 'policy_name', label: 'Policy' },
    { key: 'claim_amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'submitted_date', label: 'Submitted' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Complete system overview and management</p>
        </div>
        <Button onClick={() => setUserManagementOpen(true)}>
          <Users className="h-4 w-4 mr-2" />
          Manage Users
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={Users}
          description="Registered users"
        />
        <StatCard
          title="Active Policies"
          value={stats.totalPolicies}
          icon={Shield}
          description="Insurance policies"
        />
        <StatCard
          title="Total Claims"
          value={stats.totalClaims}
          icon={FileText}
          description="Claims processed"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalPremium.toLocaleString()}`}
          icon={DollarSign}
          description="Monthly premium"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Policy Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {policyTypeStats.map((stat) => (
                    <div key={stat.type} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {stat.type === 'Health' && <Heart className="h-4 w-4 text-red-500" />}
                        {stat.type === 'Life' && <Shield className="h-4 w-4 text-blue-500" />}
                        {stat.type === 'Car' && <Car className="h-4 w-4 text-green-500" />}
                        {stat.type === 'Travel' && <Plane className="h-4 w-4 text-purple-500" />}
                        <span className="font-medium">{stat.type}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{stat.count}</div>
                        <div className="text-sm text-muted-foreground">{stat.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Claim Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {claimStatusStats.map((stat) => (
                    <div key={stat.status} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant={stat.status === 'Approved' ? 'default' : stat.status === 'Pending' ? 'secondary' : 'destructive'}>
                          {stat.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{stat.count}</div>
                        <div className="text-sm text-muted-foreground">{stat.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable 
                columns={claimColumns} 
                data={mockClaims}
                onView={(row) => {
                  setSelectedClaim(row);
                  setClaimModalOpen(true);
                }}
                onEdit={(row) => {
                  setSelectedClaim(row);
                  setClaimModalOpen(true);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable 
                columns={[
                  { key: 'policy_name', label: 'Policy Name' },
                  { key: 'type', label: 'Type' },
                  { key: 'premium', label: 'Premium' },
                  { key: 'coverage_amount', label: 'Coverage' }
                ]} 
                data={mockPolicies}
                onView={(row) => {
                  setSelectedPolicy(row);
                  setPolicyModalOpen(true);
                }}
                onEdit={(row) => {
                  setSelectedPolicy(row);
                  setPolicyModalOpen(true);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <PolicyModal 
        open={policyModalOpen}
        onOpenChange={setPolicyModalOpen}
        policy={selectedPolicy}
        onEdit={(policy) => {
          toast.success(`Policy ${policy.policy_name} updated successfully!`);
          setPolicyModalOpen(false);
        }}
      />
      
      <ClaimModal 
        open={claimModalOpen}
        onOpenChange={setClaimModalOpen}
        claim={selectedClaim}
        mode="edit"
        onEdit={(claim, updates) => {
          toast.success(`Claim ${claim.id} updated successfully!`);
          setClaimModalOpen(false);
        }}
      />
      
      <UserManagementModal 
        open={userManagementOpen}
        onOpenChange={setUserManagementOpen}
      />
    </div>
  );
};

export const RoleBadge = () => {
	const role = useAppSelector((s) => s.auth.user?.role ?? "");
	return role ? <div className="px-3 py-1 text-xs rounded bg-primary text-primary-foreground inline-block">{role}</div> : null;
};

