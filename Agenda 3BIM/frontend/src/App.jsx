// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { getTasks } from './services/api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm'; // Importa o novo componente
import StatusPanel from './components/StatusPanel';
import TaskFilter from './components/TaskFilter';
import './app.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    
    // Estado para controlar qual formulário de autenticação é exibido
    const [authView, setAuthView] = useState('login'); // 'login', 'register', ou 'forgotPassword'
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        if (isLoggedIn) {
            fetchTasks();
        }
    }, [isLoggedIn]);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks', error);
            if (error.response && error.response.status === 401) {
                handleLogout();
            }
        }
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        setAuthView('login'); // Garante que, ao fazer logout e login de novo, a vista padrão seja 'login'
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setTasks([]);
    };

    const handleTaskCreated = (newTask) => {
        setTasks([newTask, ...tasks]);
        closeModal();
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
        closeModal();
    };

    const handleTaskDeleted = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const openModalForEdit = (task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setTaskToEdit(null);
        setIsModalOpen(false);
    };
    
    const filteredTasks = tasks.filter(task => {
        const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // Bloco de renderização para quando o utilizador NÃO está logado
    if (!isLoggedIn) {
        return (
            <div className="auth-container">
                {authView === 'login' && (
                    <LoginForm
                        onLogin={handleLogin}
                        onSwitchToRegister={() => setAuthView('register')}
                        onSwitchToForgotPassword={() => setAuthView('forgotPassword')}
                    />
                )}
                {authView === 'register' && (
                    <RegisterForm
                        onRegisterSuccess={() => setAuthView('login')}
                        onSwitchToLogin={() => setAuthView('login')}
                    />
                )}
                {authView === 'forgotPassword' && (
                    <ForgotPasswordForm
                        onSwitchToLogin={() => setAuthView('login')}
                    />
                )}
            </div>
        );
    }

    // Bloco de renderização para quando o utilizador ESTÁ logado
    return (
        <div className="app-container">
            <header>
                <h1>Minha Agenda de Tarefas</h1>
                <button onClick={handleLogout} className="btn btn-secondary">
                    Sair
                </button>
            </header>
            <main>
                <StatusPanel tasks={tasks} />
                
                <TaskFilter
                    onSearchChange={setSearchTerm}
                    onStatusChange={setStatusFilter}
                    currentStatus={statusFilter}
                />
                
                <div className="tasks-header">
                    <h2>Minhas Tarefas</h2>
                    <button className="btn btn-primary new-task-btn" onClick={() => setIsModalOpen(true)}>
                        + Nova Tarefa
                    </button>
                </div>

                <TaskList
                    tasks={filteredTasks}
                    onTaskDeleted={handleTaskDeleted}
                    onTaskUpdated={handleTaskUpdated}
                    onEditTask={openModalForEdit}
                />
            </main>
            {isModalOpen && (
                <TaskForm
                    onTaskCreated={handleTaskCreated}
                    onTaskUpdated={handleTaskUpdated}
                    closeModal={closeModal}
                    taskToEdit={taskToEdit}
                />
            )}
        </div>
    );
};

export default App;