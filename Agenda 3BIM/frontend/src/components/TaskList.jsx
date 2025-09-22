// frontend/src/components/TaskList.jsx
import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete, onToggleStatus }) => {
  // Sort tasks: pending tasks first, then by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.status === 'pendente' && b.status !== 'pendente') return -1;
    if (a.status !== 'pendente' && b.status === 'pendente') return 1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  if (sortedTasks.length === 0) {
    return <p className="no-tasks-message">Nenhuma tarefa encontrada. Que tal adicionar uma?</p>;
  }

  return (
    <div className="task-list">
      {sortedTasks.map((task) => (
        <div key={task._id} className={`task-card ${task.status === 'concluída' ? 'task-completed' : 'task-pending'}`}>
          <div className="task-info">
            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">{task.description}</p>
          </div>

          <div className="task-details">
            <span className="task-due-date">
              Data de Entrega: <strong>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</strong>
            </span>
            <span className={`task-status ${task.status === 'concluída' ? 'status-label-completed' : 'status-label-pending'}`}>
              {task.status === 'concluída' ? 'Concluída' : 'Pendente'}
            </span>
          </div>

          <div className="task-actions">
            <button
              className={`btn ${task.status === 'pendente' ? 'btn-mark-complete' : 'btn-mark-pending'}`}
              onClick={() => onToggleStatus(task)}
              title={task.status === 'pendente' ? 'Marcar como Concluída' : 'Marcar como Pendente'}
            >
              {task.status === 'pendente' ? '✓ Concluir' : '⟲ Reabrir'}
            </button>
            <button
              className="btn btn-edit"
              onClick={() => onEdit(task)}
              title="Editar Tarefa"
            >
              Editar
            </button>
            <button
              className="btn btn-delete"
              onClick={() => onDelete(task._id)}
              title="Excluir Tarefa"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;