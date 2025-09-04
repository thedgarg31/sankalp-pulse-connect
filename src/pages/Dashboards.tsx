import { useAppSelector } from "@/hooks/useAppStore";

export const CustomerDashboard = () => {
	return <div className="p-6">Customer Dashboard</div>;
};

export const EmployeeDashboard = () => {
	return <div className="p-6">Employee Dashboard</div>;
};

export const AgentDashboard = () => {
	return <div className="p-6">Agent/Broker Dashboard</div>;
};

export const AdminDashboard = () => {
	return <div className="p-6">Admin Dashboard</div>;
};

export const RoleBadge = () => {
	const role = useAppSelector((s) => s.auth.user?.role ?? "");
	return role ? <div className="px-3 py-1 text-xs rounded bg-primary text-primary-foreground inline-block">{role}</div> : null;
};

