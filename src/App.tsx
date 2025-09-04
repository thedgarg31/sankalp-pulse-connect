import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AdminDashboard, AgentDashboard, CustomerDashboard, EmployeeDashboard } from "@/pages/Dashboards";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

const queryClient = new QueryClient();

const App = () => (
	<Provider store={store}>
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>
					<div className="min-h-screen bg-background">
						<Header />
						<main>
							<Routes>
								<Route path="/" element={<Index />} />
								<Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
									<Route path="/customer-dashboard" element={<CustomerDashboard />} />
								</Route>
								<Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
									<Route path="/employee-dashboard" element={<EmployeeDashboard />} />
								</Route>
								<Route element={<ProtectedRoute allowedRoles={["agent"]} />}>
									<Route path="/broker-dashboard" element={<AgentDashboard />} />
								</Route>
								<Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
									<Route path="/admin-dashboard" element={<AdminDashboard />} />
								</Route>
								{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
								<Route path="*" element={<NotFound />} />
							</Routes>
						</main>
					</div>
				</BrowserRouter>
			</TooltipProvider>
		</QueryClientProvider>
	</Provider>
);

export default App;
