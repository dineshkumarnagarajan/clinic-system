import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Card,
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    CircularProgress,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, isLoading, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', alignItems: 'center' }}>
                <Card sx={{ p: 4, width: '100%' }}>
                    <Typography variant="h2" sx={{ mb: 3, textAlign: 'center' }}>
                        Clinic System
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
                        Staff Login
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                            disabled={isLoading}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                            disabled={isLoading}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            type="submit"
                            sx={{ mt: 3 }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Login'}
                        </Button>
                    </form>

                    <Typography sx={{ mt: 3, textAlign: 'center', fontSize: '0.875rem', color: 'text.secondary' }}>
                        Demo credentials:<br />
                        Email: clinician@hospital.com<br />
                        Password: password123
                    </Typography>
                </Card>
            </Box>
        </Container>
    );
}
