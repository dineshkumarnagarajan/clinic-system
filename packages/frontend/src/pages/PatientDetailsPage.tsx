import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    Container,
    Box,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    AppBar,
    Toolbar,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { patientService } from '../services/api';

export default function PatientDetailsPage() {
    const { patientId } = useParams<{ patientId: string }>();
    const navigate = useNavigate();

    const { data: patient, isLoading: patientLoading } = useQuery({
        queryKey: ['patient', patientId],
        queryFn: () => patientService.getPatientDetails(patientId!),
        select: (response) => response.data,
    });

    const { data: documents = [], isLoading: documentsLoading } = useQuery({
        queryKey: ['patientDocuments', patientId],
        queryFn: () => patientService.getPatientDocuments(patientId!),
        select: (response) => response.data,
    });

    const isLoading = patientLoading || documentsLoading;

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Button color="inherit" startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </Button>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Patient Details
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Card sx={{ mb: 3 }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ mb: 2 }}>
                                    {patient?.firstName} {patient?.lastName}
                                </Typography>
                                <Typography color="textSecondary" sx={{ mb: 1 }}>
                                    <strong>Patient ID:</strong> {patient?.patientId}
                                </Typography>
                                <Typography color="textSecondary" sx={{ mb: 1 }}>
                                    <strong>Date of Birth:</strong> {new Date(patient?.dateOfBirth).toLocaleDateString()}
                                </Typography>
                                <Typography color="textSecondary" sx={{ mb: 1 }}>
                                    <strong>Department:</strong> {patient?.department}
                                </Typography>
                                <Typography color="textSecondary">
                                    <strong>Hospital:</strong> {patient?.hospital}
                                </Typography>
                            </CardContent>
                        </Card>

                        <Typography variant="h6" sx={{ mb: 2 }}>
                            📄 Documents ({documents.length})
                        </Typography>

                        <Card>
                            {documents.length === 0 ? (
                                <CardContent>
                                    <Typography color="textSecondary">No documents found for this patient</Typography>
                                </CardContent>
                            ) : (
                                <List>
                                    {documents.map((doc: any, index: number) => (
                                        <Box key={doc._id}>
                                            <ListItem>
                                                <ListItemText
                                                    primary={doc.title}
                                                    secondary={`Type: ${doc.documentType.replace(/_/g, ' ')} | Uploaded: ${new Date(
                                                        doc.createdAt
                                                    ).toLocaleDateString()}`}
                                                />
                                            </ListItem>
                                            {index < documents.length - 1 && <Divider />}
                                        </Box>
                                    ))}
                                </List>
                            )}
                        </Card>
                    </>
                )}
            </Container>
        </>
    );
}
