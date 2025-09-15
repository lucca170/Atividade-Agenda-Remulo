// frontend/src/components/TaskForm.jsx
import React, { useState, useEffect } from 'react'; // Adicionado useEffect para lidar com taskToEdit
import { createTask, updateTask } from '../services/api';
import './FormModal.css';

// Função para obter a data de hoje no formato YYYY-MM-DD
const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const TaskForm = ({ onTaskCreated, onTaskUpdated, closeModal, taskToEdit }) => {
    const isEdit = !!taskToEdit;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(getTodayDate());
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit && taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setDueDate(taskToEdit.due_date);
        } else {
            // Resetar o formulário se não estiver editando ou se taskToEdit for nulo
            setTitle('');
            setDescription('');
            setDueDate(getTodayDate());
        }
    }, [taskToEdit, isEdit]); // Executa quando taskToEdit ou isEdit muda

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (dueDate < getTodayDate() && !isEdit) { // Permite editar com data passada se já existia
            setError('A data de entrega não pode ser anterior ao dia de hoje para novas tarefas.');
            return;
        }
        try {
            const taskData = { title, description, due_date: dueDate };
            if (isEdit) {
                // Ao editar, mantém o status original da tarefa
                const response = await updateTask(taskToEdit.id, { ...taskToEdit, ...taskData });
                onTaskUpdated(response.data);
            } else {
                // Novas tarefas começam como "Pendente"
                const response = await createTask({ ...taskData, status: 'Pendente' });
                onTaskCreated(response.data);
            }
            closeModal();
        } catch (err) {
            const errorMessage = err.response?.data?.detail || err.message || 'Ocorreu um erro ao salvar a tarefa.';
            setError(errorMessage);
            console.error('Failed to save task', err);
        }
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{isEdit ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Título <span className="required">*</span></label>
                        <input
                            type="text" id="title" value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ex: Desenvolver a tela de login" required
                            maxLength="100" // Limite de caracteres para título
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            id="description" value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Detalhes da tarefa..."
                            rows="4" // Aumenta o tamanho do textarea
                            maxLength="500" // Limite de caracteres para descrição
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="due-date">Data de Entrega <span className="required">*</span></label>
                        <input
                            type="date"
                            id="due-date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                            min={getTodayDate()} // Para novas tarefas, impede data passada
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {isEdit ? 'Salvar Alterações' : 'Criar Tarefa'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;