import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete, onToggleStatus }) => {
  if (tasks.length === 0) {
    return <p className="no-tasks-message">Nenhuma tarefa encontrada. Que tal adicionar uma?</p>;
  }

  // A ordenação já é feita no Dashboard, mas podemos garantir aqui se necessário.
  const sortedTasks = [...tasks];

  return (
    <div className="task-list">
      {sortedTasks.map((task) => (
        // Corrigido para usar task.id como key
        <div key={task.id} className={`task-card ${task.status === 'concluída' ? 'task-completed' : 'task-pending'}`}>
          <div className="task-info">
            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">{task.description}</p>
          </div>

          <div className="task-details">
            <span className="task-due-date">
              {/* Corrigido para usar task.due_date */}
              Data de Entrega: <strong>{new Date(task.due_date).toLocaleDateString('pt-BR')}</strong>
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
              // Corrigido para usar task.id na exclusão
              onClick={() => onDelete(task.id)}
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