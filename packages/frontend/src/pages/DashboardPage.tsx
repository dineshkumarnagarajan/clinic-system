import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
    Container,
    Box,
    TextField,
    Button,
    Card,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    CircularProgress,
    AppBar,
    Toolbar,
    Menu,
    MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';
import { useAuth } from '../hooks/useAuth';
import { patientService } from '../services/api';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function DashboardPage() {
    const navigate = useNavigate();
    const { user } = useAppSelector((state: any) => state.auth);
    const { logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    type Patient = {
        _id: string;
        patientId: string;
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        department: string;
    };

    type PatientResponse = {
        patients: Patient[];
        nextCursor?: string;
    };

    const fetchPatients = async ({ pageParam = '' }: any) => {
        const response = searchQuery
            ? await patientService.searchPatients(searchQuery, pageParam, 20)
            : await patientService.getTodaysPatients(pageParam, 20);

        return response.data as PatientResponse;
    };

    const {
        data,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery<any, Error>({
        queryKey: ['patients', searchQuery],
        queryFn: fetchPatients,
        getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
        initialPageParam: 0,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
    console.log("data", data)
    const patients: any = data?.pages[0] ?? [];
    console.log("patients", patients)
    const safePatients: any = patients;
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Clinic Document Management
                    </Typography>
                    <Button
                        color="inherit"
                        startIcon={<AccountCircleIcon />}
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                        {user?.firstName}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem disabled>{user?.email}</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        Patient Search & Documents
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Search by Patient ID, Name, or DOB..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        variant="outlined"
                    />
                </Box>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Card>
                        <List>
                            {safePatients.length === 0 ? (
                                <ListItem>
                                    <ListItemText primary="No patients found" secondary="Try a different search" />
                                </ListItem>
                            ) : (
                                safePatients.map((patient: any) => (
                                    <ListItemButton
                                        key={patient._id || patient.patientId}
                                        onClick={() => navigate(`/patients/${patient.patientId}`)}
                                    >
                                        <ListItemText
                                            primary={`${patient.firstName || 'Unknown'} ${patient.lastName || ''} (ID: ${patient.patientId || 'N/A'})`}
                                            secondary={`DOB: ${patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'Unknown'} | Department: ${patient.department || 'Unknown'}`}
                                        />
                                    </ListItemButton>
                                ))
                            )}
                        </List>
                        {hasNextPage && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                                <Button
                                    variant="contained"
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                >
                                    {isFetchingNextPage ? 'Loading...' : 'Load more'}
                                </Button>
                            </Box>
                        )}
                    </Card>
                )}
            </Container>
        </>
    );
}
