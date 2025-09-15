// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { getTasks } from './services/api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import StatusPanel from './components/StatusPanel';
import TaskFilter from './components/TaskFilter'; // 1. IMPORTAR O NOVO COMPONENTE
import './app.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [showRegister, setShowRegister] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    
    // 2. ADICIONAR ESTADOS PARA OS FILTROS
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
    
    // 3. LÓGICA PARA FILTRAR AS TAREFAS
    const filteredTasks = tasks.filter(task => {
        const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    if (!isLoggedIn) {
        return (
            <div className="auth-container">
                {showRegister ? (
                    <RegisterForm
                        onRegisterSuccess={() => setShowRegister(false)}
                        onSwitchToLogin={() => setShowRegister(false)}
                    />
                ) : (
                    <LoginForm
                        onLogin={handleLogin}
                        onSwitchToRegister={() => setShowRegister(true)}
                    />
                )}
            </div>
        );
    }

    return (
        <div className="app-container">
            <header>
                <h1>Minha Agenda de Tarefas</h1>
                <button onClick={handleLogout} className="btn btn-secondary">
                    Sair
                </button>
            </header>
            <main>
                <StatusPanel tasks={tasks} /> {/* Painel de status continua mostrando o total */}
                
                {/* 4. RENDERIZAR O COMPONENTE DE FILTRO */}
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
                    tasks={filteredTasks} // 5. PASSAR A LISTA JÁ FILTRADA
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