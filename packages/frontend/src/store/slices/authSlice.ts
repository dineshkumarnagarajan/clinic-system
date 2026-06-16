import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StaffUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    department: string;
}

interface AuthState {
    user: StaffUser | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

const parseLocalStorageUser = (): StaffUser | null => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
        return null;
    }

    try {
        return JSON.parse(storedUser) as StaffUser;
    } catch {
        localStorage.removeItem('user');
        return null;
    }
};

const initialState: AuthState = {
    user: parseLocalStorageUser(),
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        loginSuccess: (state, action: PayloadAction<{ user: StaffUser; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
});

export const { setLoading, setError, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
