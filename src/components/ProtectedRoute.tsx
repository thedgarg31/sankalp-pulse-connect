import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppStore";
import type { UserRole } from "@/store/authSlice";

interface ProtectedRouteProps {
	allowedRoles: UserRole[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
	const { isAuthenticated, user } = useAppSelector((s) => s.auth);
	if (!isAuthenticated || !user) return <Navigate to="/" replace />;
	if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
	return <Outlet />;
};

export default ProtectedRoute;

