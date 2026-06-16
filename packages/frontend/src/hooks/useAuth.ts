import axios from 'axios';
import { useAppDispatch, useAppSelector } from './useRedux';
import { loginSuccess, logout, setLoading, setError } from '../store/slices/authSlice';

const API_URL = (import.meta as any).env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_URL,
});

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, token, isLoading, error }: any = useAppSelector((state) => state.auth);

    const login = async (email: string, password: string) => {
        dispatch(setLoading(true));
        try {
            const response = await apiClient.post('/auth/login', { email, password });
            dispatch(loginSuccess(response.data));
            return response.data;
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || 'Login failed';
            dispatch(setError(errorMessage));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const logout_ = () => {
        dispatch(logout());
    };

    return {
        user,
        token,
        isLoading,
        error,
        login,
        logout: logout_,
    };
};
