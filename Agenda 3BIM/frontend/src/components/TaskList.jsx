// frontend/src/components/TaskList.jsx
import React from 'react';
import { deleteTask, updateTask } from '../services/api';
import './TaskList.css'; // Mantenha o arquivo CSS para os estilos

const TaskList = ({ tasks, onTaskDeleted, onTaskUpdated, onEditTask }) => {

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            onTaskDeleted(id);
        } catch (error) {
            console.error('Failed to delete task', error);
            alert('Erro ao excluir a tarefa.');
        }
    };

    const handleToggleStatus = async (task) => {
        const newStatus = task.status === 'Pendente' ? 'Concluída' : 'Pendente';
        try {
            const response = await updateTask(task.id, { ...task, status: newStatus });
            onTaskUpdated(response.data);
        } catch (error) {
            console.error('Failed to update task status', error);
            alert('Erro ao atualizar o status da tarefa.');
        }
    };

    // Ordena as tarefas: Pendentes primeiro, depois Concluídas. Dentro de cada grupo, por data.
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.status === 'Pendente' && b.status === 'Concluída') return -1;
        if (a.status === 'Concluída' && b.status === 'Pendente') return 1;
        return new Date(a.due_date) - new Date(b.due_date);
    });

    return (
        <div className="task-list">
            {sortedTasks.length === 0 ? (
                <p className="no-tasks-message">Nenhuma tarefa encontrada. Que tal adicionar uma?</p>
            ) : (
                sortedTasks.map((task) => (
                    <div key={task.id} className={`task-card ${task.status === 'Concluída' ? 'task-completed' : 'task-pending'}`}>
                        <div className="task-info">
                            <h3 className="task-title">{task.title}</h3>
                            <p className="task-description">{task.description}</p>
                        </div>
                        <div className="task-details">
                            <span className="task-due-date">
                                Data de Entrega: <strong>{new Date(task.due_date).toLocaleDateString('pt-BR')}</strong>
                            </span>
                            <span className={`task-status ${task.status === 'Concluída' ? 'status-label-completed' : 'status-label-pending'}`}>
                                {task.status === 'Concluída' ? 'Concluída' : 'Pendente'}
                            </span>
                        </div>
                        <div className="task-actions">
                            <button
                                className={`btn ${task.status === 'Pendente' ? 'btn-mark-complete' : 'btn-mark-pending'}`}
                                onClick={() => handleToggleStatus(task)}
                                title={task.status === 'Pendente' ? 'Marcar como Concluída' : 'Marcar como Pendente'}
                            >
                                {task.status === 'Pendente' ? '✓ Concluir' : '⟲ Reabrir'}
                            </button>
                            <button
                                className="btn btn-edit"
                                onClick={() => onEditTask(task)}
                                title="Editar Tarefa"
                            >
                                Editar
                            </button>
                            <button
                                className="btn btn-delete"
                                onClick={() => handleDelete(task.id)}
                                title="Excluir Tarefa"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TaskList;