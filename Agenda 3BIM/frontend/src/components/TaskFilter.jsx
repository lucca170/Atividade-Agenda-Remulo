import React from 'react';
import './TaskFilter.css';

const TaskFilter = ({ onSearchChange, onStatusChange, currentStatus }) => {
  const statusOptions = ['Todos', 'Pendente', 'Concluída'];

  return (
    <div className="task-filter-container">
      <input
        type="text"
        placeholder="Pesquisar tarefas pelo título..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <div className="status-filters">
        {statusOptions.map(status => (
          <button
            key={status}
            className={currentStatus === (status === 'Todos' ? 'all' : status) ? 'active' : ''}
            onClick={() => onStatusChange(status === 'Todos' ? 'all' : status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;