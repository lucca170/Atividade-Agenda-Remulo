// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks } from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import StatusPanel from '../components/StatusPanel';
import TaskFilter from '../components/TaskFilter';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); // Redireciona para a página de login
    };
    
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

export default Dashboard;