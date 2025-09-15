import React from 'react';
import './StatusPanel.css';

function StatusPanel({ tasks }) {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => task.status === 'pendente').length;
  const completedTasks = totalTasks - pendingTasks;

  return (
    <div className="status-panel">
      <div className="status-card">
        <span className="status-label">Total de Tarefas</span>
        <span className="status-value">{totalTasks}</span>
      </div>
      <div className="status-card">
        <span className="status-label">Pendentes</span>
        <span className="status-value pending">{pendingTasks}</span>
      </div>
      <div className="status-card">
        <span className="status-label">Concluídas</span>
        <span className="status-value completed">{completedTasks}</span>
      </div>
    </div>
  );
}

export default StatusPanel;