import React from 'react';
import './TaskList.css';

// Adicionei ícones SVG diretamente para não precisar de bibliotecas externas
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
);

// Ícone para o checkbox
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);


// --- CORREÇÃO APLICADA AQUI ---
// Se 'tasks' for undefined, ele assumirá o valor de um array vazio [].
function TaskList({ tasks = [], onEdit, onDelete, onToggleStatus }) {
  // Agora esta linha é 100% segura. Se tasks for undefined, tasks.length será 0.
  if (tasks.length === 0) {
    return <div className="empty-state">
        <h3>Nenhuma tarefa aqui!</h3>
        <p>Você não tem tarefas para este filtro. Tente adicionar uma nova!</p>
    </div>;
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task._id} className={`task-item status-${task.status}`}>
          
          <div className="task-toggle" onClick={() => onToggleStatus(task)}>
            <div className={`checkbox ${task.status === 'concluída' ? 'checked' : ''}`}>
              {task.status === 'concluída' && <CheckIcon />}
            </div>
          </div>

          <div className="task-info">
            <span className={`task-title ${task.status === 'concluída' ? 'completed-title' : ''}`}>
              {task.title}
            </span>
            <span className="task-date">
              Vencimento: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>

          <div className="task-actions">
            <button className="icon-button edit" onClick={() => onEdit(task)}>
              <EditIcon />
            </button>
            <button className="icon-button delete" onClick={() => onDelete(task._id)}>
              <DeleteIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;