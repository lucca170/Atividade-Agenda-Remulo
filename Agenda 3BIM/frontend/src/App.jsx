import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import StatusPanel from './components/StatusPanel';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import FormModal from './components/FormModal';
import './app.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadTasks();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    filterTasks();
  }, [tasks, filter]);

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      const sortedTasks = response.data.sort((a, b) => {
        if (a.status === 'pendente' && b.status !== 'pendente') return -1;
        if (a.status !== 'pendente' && b.status === 'pendente') return 1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
      setTasks(sortedTasks);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  const filterTasks = () => {
    if (filter === 'all') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.status === filter));
    }
  };

  const handleSaveTask = async (task) => {
    if (task._id) {
      await updateTask(task._id, task);
    } else {
      await createTask(task);
    }
    loadTasks();
    closeModal();
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      await deleteTask(id);
      loadTasks();
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'pendente' ? 'concluída' : 'pendente';
    await updateTask(task._id, { ...task, status: newStatus });
    loadTasks();
  };

  const openModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return isRegistering ? (
      <RegisterForm 
        onRegister={() => {
            alert('Cadastro realizado com sucesso! Faça o login.');
            setIsRegistering(false)
        }} 
        onSwitchToLogin={() => setIsRegistering(false)}
      />
    ) : (
      <LoginForm 
        onLogin={handleLogin} 
        onSwitchToRegister={() => setIsRegistering(true)} 
      />
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Minha Agenda</h1>
        <button onClick={handleLogout} className="logout-button">Sair</button>
      </header>
      
      <main>
        {/* GARANTA QUE ESTA LINHA ESTEJA CORRETA */}
        <StatusPanel tasks={tasks} />

        <TaskFilter filter={filter} setFilter={setFilter} />
        <TaskList 
          tasks={filteredTasks} 
          onEdit={handleEditTask} 
          onDelete={handleDeleteTask} 
          onToggleStatus={handleToggleStatus}
        />
      </main>

      <div className="fab-container">
        <button onClick={openModal} className="fab" aria-label="Nova Tarefa">+</button>
      </div>
      
      {isModalOpen && (
        <FormModal onClose={closeModal}>
          <h2>{editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
          <TaskForm 
            task={editingTask} 
            onSave={handleSaveTask} 
            onCancel={closeModal} 
          />
        </FormModal>
      )}
    </div>
  );
}

export default App;