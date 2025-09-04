// Mock data based on insurance_management.sql schema
export interface User {
  id: number;
  username: string;
  role: 'admin' | 'agent' | 'clerk';
  email: string;
}

// Email to role mapping for validation
export const emailRoleMap: Record<string, 'customer' | 'employee' | 'agent' | 'admin'> = {
  'customer@example.com': 'customer',
  'employee@example.com': 'employee', 
  'agent@example.com': 'agent',
  'admin@example.com': 'admin',
  'daksh@example.com': 'agent',
  'rajesh@example.com': 'admin',
  'farhan@example.com': 'employee',
  'jaivardhan@example.com': 'agent',
  'aryan@example.com': 'employee',
  'anant@example.com': 'admin',
  'mohammad@example.com': 'agent',
  'divyam@example.com': 'employee',
  'ronit@example.com': 'agent',
  'soham@example.com': 'admin',
  'siddharth@example.com': 'employee',
  'aakash@example.com': 'agent',
  'abhishek@example.com': 'employee',
  'yash@example.com': 'agent',
  'deepak@example.com': 'admin',
  'naman@example.com': 'agent',
  'gopal@example.com': 'employee',
  'tushar@example.com': 'agent',
  'piyush@example.com': 'employee',
  'rahul@example.com': 'admin',
  'vishal@example.com': 'agent',
  'ravi@example.com': 'employee',
  'suresh@example.com': 'agent',
  'harsh@example.com': 'admin',
  'ajay@example.com': 'employee',
  'manish@example.com': 'agent',
  'sanjay@example.com': 'admin',
  'shubham@example.com': 'agent',
  'amit@example.com': 'employee',
  'karan@example.com': 'admin',
  'ankit@example.com': 'agent',
  'varun@example.com': 'employee',
  'parth@example.com': 'agent',
  'chirag@example.com': 'admin',
  'rohit@example.com': 'employee',
  'lalit@example.com': 'agent',
  'vikas@example.com': 'admin',
  'sunil@example.com': 'employee',
  'arvind@example.com': 'agent',
  'sandeep@example.com': 'employee',
  'alok@example.com': 'admin',
  'vivek@example.com': 'agent',
  'dhruv@example.com': 'employee',
  'ankur@example.com': 'agent',
  'rajat@example.com': 'admin',
  'satyam@example.com': 'employee',
  'uttam@example.com': 'agent',
  'abhay@example.com': 'employee',
};

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Policy {
  id: number;
  policy_name: string;
  type: 'health' | 'life' | 'car' | 'travel';
  premium: number;
  coverage_amount: number;
}

export interface Claim {
  id: number;
  customer_id: number;
  policy_id: number;
  claim_amount: number;
  status: 'pending' | 'approved' | 'rejected';
  customer_name?: string;
  policy_name?: string;
  submitted_date?: string;
}

// Mock data arrays
export const mockUsers: User[] = [
  { id: 1, username: 'rajesh', role: 'admin' },
  { id: 2, username: 'daksh', role: 'agent' },
  { id: 3, username: 'farhan', role: 'clerk' },
  { id: 4, username: 'jaivardhan', role: 'agent' },
  { id: 5, username: 'aryan', role: 'clerk' },
];

export const mockCustomers: Customer[] = [
  { id: 1, name: 'Jaivardhan Singh', email: 'jai@example.com', phone: '9876543210' },
  { id: 2, name: 'Aryan Mehta', email: 'aryan@example.com', phone: '9123456789' },
  { id: 3, name: 'Anant Kumar', email: 'anant@example.com', phone: '9988776655' },
  { id: 4, name: 'Mohammad Ali', email: 'mohammad@example.com', phone: '9876501234' },
  { id: 5, name: 'Divyam Sharma', email: 'divyam@example.com', phone: '9898989898' },
  { id: 6, name: 'Ronit Kapoor', email: 'ronit@example.com', phone: '9123498765' },
  { id: 7, name: 'Soham Patil', email: 'soham@example.com', phone: '9345612789' },
  { id: 8, name: 'Rajesh Gupta', email: 'rajesh@example.com', phone: '9812345670' },
  { id: 9, name: 'Daksh Garg', email: 'daksh@example.com', phone: '9823456781' },
  { id: 10, name: 'Farhan Khan', email: 'farhan@example.com', phone: '9834567892' },
];

export const mockPolicies: Policy[] = [
  { id: 1, policy_name: 'Health Secure Plus', type: 'health', premium: 12000, coverage_amount: 500000 },
  { id: 2, policy_name: 'Life Protect Plan', type: 'life', premium: 15000, coverage_amount: 1000000 },
  { id: 3, policy_name: 'Car Shield', type: 'car', premium: 8000, coverage_amount: 300000 },
  { id: 4, policy_name: 'Travel Guard', type: 'travel', premium: 5000, coverage_amount: 200000 },
  { id: 5, policy_name: 'Family Health Cover', type: 'health', premium: 18000, coverage_amount: 700000 },
  { id: 6, policy_name: 'Senior Citizen Life', type: 'life', premium: 20000, coverage_amount: 1200000 },
  { id: 7, policy_name: 'Motor Secure', type: 'car', premium: 9000, coverage_amount: 350000 },
  { id: 8, policy_name: 'Global Travel Care', type: 'travel', premium: 6000, coverage_amount: 250000 },
  { id: 9, policy_name: 'Medi Assist Plan', type: 'health', premium: 10000, coverage_amount: 400000 },
  { id: 10, policy_name: 'Term Life Protect', type: 'life', premium: 17000, coverage_amount: 900000 },
];

export const mockClaims: Claim[] = [
  { id: 1, customer_id: 1, policy_id: 1, claim_amount: 50000, status: 'pending', customer_name: 'Jaivardhan Singh', policy_name: 'Health Secure Plus', submitted_date: '2024-01-15' },
  { id: 2, customer_id: 2, policy_id: 2, claim_amount: 150000, status: 'approved', customer_name: 'Aryan Mehta', policy_name: 'Life Protect Plan', submitted_date: '2024-01-10' },
  { id: 3, customer_id: 3, policy_id: 3, claim_amount: 20000, status: 'rejected', customer_name: 'Anant Kumar', policy_name: 'Car Shield', submitted_date: '2024-01-12' },
  { id: 4, customer_id: 4, policy_id: 4, claim_amount: 10000, status: 'pending', customer_name: 'Mohammad Ali', policy_name: 'Travel Guard', submitted_date: '2024-01-18' },
  { id: 5, customer_id: 5, policy_id: 5, claim_amount: 75000, status: 'approved', customer_name: 'Divyam Sharma', policy_name: 'Family Health Cover', submitted_date: '2024-01-08' },
  { id: 6, customer_id: 6, policy_id: 6, claim_amount: 120000, status: 'pending', customer_name: 'Ronit Kapoor', policy_name: 'Senior Citizen Life', submitted_date: '2024-01-20' },
  { id: 7, customer_id: 7, policy_id: 7, claim_amount: 18000, status: 'approved', customer_name: 'Soham Patil', policy_name: 'Motor Secure', submitted_date: '2024-01-14' },
  { id: 8, customer_id: 8, policy_id: 8, claim_amount: 25000, status: 'pending', customer_name: 'Rajesh Gupta', policy_name: 'Global Travel Care', submitted_date: '2024-01-16' },
  { id: 9, customer_id: 9, policy_id: 9, claim_amount: 50000, status: 'approved', customer_name: 'Daksh Garg', policy_name: 'Medi Assist Plan', submitted_date: '2024-01-11' },
  { id: 10, customer_id: 10, policy_id: 10, claim_amount: 20000, status: 'pending', customer_name: 'Farhan Khan', policy_name: 'Term Life Protect', submitted_date: '2024-01-19' },
];

// Analytics data
export const getDashboardStats = () => ({
  totalCustomers: mockCustomers.length,
  totalPolicies: mockPolicies.length,
  totalClaims: mockClaims.length,
  pendingClaims: mockClaims.filter(c => c.status === 'pending').length,
  approvedClaims: mockClaims.filter(c => c.status === 'approved').length,
  rejectedClaims: mockClaims.filter(c => c.status === 'rejected').length,
  totalPremium: mockPolicies.reduce((sum, p) => sum + p.premium, 0),
  totalCoverage: mockPolicies.reduce((sum, p) => sum + p.coverage_amount, 0),
  totalClaimAmount: mockClaims.reduce((sum, c) => sum + c.claim_amount, 0),
});

export const getPolicyTypeStats = () => {
  const stats = mockPolicies.reduce((acc, policy) => {
    acc[policy.type] = (acc[policy.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(stats).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count,
    percentage: Math.round((count / mockPolicies.length) * 100)
  }));
};

export const getClaimStatusStats = () => {
  const stats = mockClaims.reduce((acc, claim) => {
    acc[claim.status] = (acc[claim.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(stats).map(([status, count]) => ({
    status: status.charAt(0).toUpperCase() + status.slice(1),
    count,
    percentage: Math.round((count / mockClaims.length) * 100)
  }));
};

export const getRecentClaims = () => mockClaims.slice(0, 5);

export const getTopPolicies = () => mockPolicies.slice(0, 5);
