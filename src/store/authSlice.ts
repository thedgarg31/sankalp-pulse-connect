import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "customer" | "employee" | "agent" | "admin";

export interface AuthUser {
	email: string;
	role: UserRole;
}

export interface AuthState {
	isAuthenticated: boolean;
	user: AuthUser | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	user: null
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginSuccess: (state, action: PayloadAction<AuthUser>) => {
			state.isAuthenticated = true;
			state.user = action.payload;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
		}
	}
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

