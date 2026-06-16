import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';

interface PrivateRouteProps {
    children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const { token }: any = useAppSelector((state) => state.auth);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
