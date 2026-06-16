import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { store } from './store';
import { theme } from './theme/theme';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PatientDetailsPage from './pages/PatientDetailsPage';
import PrivateRoute from './components/PrivateRoute';

const queryClient = new QueryClient();

function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Router>
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/dashboard"
                                element={<PrivateRoute><DashboardPage /></PrivateRoute>}
                            />
                            <Route
                                path="/patients/:patientId"
                                element={<PrivateRoute><PatientDetailsPage /></PrivateRoute>}
                            />
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                    </Router>
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
