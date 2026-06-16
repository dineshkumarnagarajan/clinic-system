import axios from 'axios';

const API_URL = (import.meta as any).env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const patientService = {
    searchPatients: (query: string, cursor?: string, limit?: number) =>
        apiClient.get('/patients/search', { params: { query, cursor, limit } }),
    getPatientDetails: (patientId: string) =>
        apiClient.get(`/patients/${patientId}`),
    getTodaysPatients: (cursor?: string, limit?: number) =>
        apiClient.get('/patients/today', { params: { cursor, limit } }),
    getPatientDocuments: (patientId: string) =>
        apiClient.get(`/patients/${patientId}/documents`),
};

export const documentService = {
    uploadDocument: (data: any) =>
        apiClient.post('/documents/upload', data),
    getDocuments: (patientId?: string) =>
        apiClient.get('/documents', { params: { patientId } }),
    getDocumentById: (documentId: string) =>
        apiClient.get(`/documents/${documentId}`),
};
