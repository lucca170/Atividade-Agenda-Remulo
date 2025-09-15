// frontend/src/components/StatusPanel.jsx
import React from 'react';
import './StatusPanel.css'; // Mantenha o arquivo CSS para os estilos

const StatusPanel = ({ tasks }) => {
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(task => task.status === 'Pendente').length;
    const completedTasks = tasks.filter(task => task.status === 'Concluída').length;

    return (
        <div className="status-panel">
            <div className="status-item">
                <h3>Total de Tarefas</h3>
                <p className="status-value total">{totalTasks}</p>
            </div>
            <div className="status-item">
                <h3>Pendentes</h3>
                <p className="status-value pending">{pendingTasks}</p>
            </div>
            <div className="status-item">
                <h3>Concluídas</h3>
                <p className="status-value completed">{completedTasks}</p>
            </div>
        </div>
    );
};

export default StatusPanel;