import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';
import StatusPanel from '../components/StatusPanel';
import FormModal from '../components/FormModal';

const Dashboard = ({ onLogout, theme, toggleTheme }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, filter]);

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      // Ordenação corrigida para usar due_date
      const sortedTasks = response.data.sort((a, b) => {
        if (a.status === 'pendente' && b.status !== 'pendente') return -1;
        if (a.status !== 'pendente' && b.status === 'pendente') return 1;
        return new Date(a.due_date) - new Date(b.due_date);
      });
      setTasks(sortedTasks);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      if (error.response && error.response.status === 401) {
        onLogout();
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

  const handleSaveTask = async (taskData) => {
    try {
      // Usa taskData.id para verificar se é edição
      if (taskData.id) {
        await updateTask(taskData.id, taskData);
      } else {
        await createTask(taskData);
      }
      loadTasks();
      closeModal();
    } catch (error) {
      console.error("Erro ao salvar a tarefa:", error.response?.data || error.message);
      alert('Não foi possível salvar a tarefa. Verifique os dados e tente novamente.');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await deleteTask(id);
        loadTasks();
      } catch (error) {
        console.error("Erro ao excluir a tarefa:", error);
        alert('Não foi possível excluir a tarefa.');
      }
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'pendente' ? 'concluída' : 'pendente';
      // Usa task.id para atualizar
      await updateTask(task.id, { ...task, status: newStatus });
      loadTasks();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert('Não foi possível atualizar o status da tarefa.');
    }
  };

  const openModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Minha Agenda</h1>
        <div>
          <button onClick={toggleTheme} className="theme-toggle-button">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button onClick={onLogout} className="logout-button">Sair</button>
        </div>
      </header>
      
      <main>
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
};

export default Dashboard;