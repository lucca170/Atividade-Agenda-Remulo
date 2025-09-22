// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

// Interceptador para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

// --- FUNÇÕES DE AUTENTICAÇÃO ---
// CORREÇÃO: As funções agora recebem um único objeto com os dados.
export const login = (credentials) => api.post('token/', credentials);
export const register = (userData) => api.post('users/', userData);
export const requestPasswordReset = (email) => api.post('password-reset/', { email });

// --- FUNÇÕES DE TAREFAS ---
export const getTasks = () => api.get('tasks/');
export const createTask = (task) => api.post('tasks/', task);
export const updateTask = (id, taskData) => api.put(`tasks/${id}/`, taskData);
export const deleteTask = (id) => api.delete(`tasks/${id}/`);

export const getTaskStatusCount = () => api.get('/tasks/status_count/');

export default api;