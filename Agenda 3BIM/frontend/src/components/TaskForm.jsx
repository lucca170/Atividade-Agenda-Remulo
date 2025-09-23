import React, { useState, useEffect } from 'react';

function TaskForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      // Ajusta o formato da data para o input tipo 'date' e usa task.due_date
      setDueDate(task.due_date ? task.due_date.split('T')[0] : '');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert('Por favor, preencha o título e a data de entrega.');
      return;
    }
    
    // Monta o objeto a ser salvo, usando 'id' e 'due_date'
    const taskData = {
      ...(task && { id: task.id }),
      title,
      description,
      due_date: dueDate,
      // Garante que o status seja enviado corretamente
      status: task ? task.status : 'pendente'
    };
    onSave(taskData);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="dueDate">Data de Entrega</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-cancel">
          Cancelar
        </button>
        <button type="submit" className="btn-save">
          Salvar
        </button>
      </div>
    </form>
  );
}

export default TaskForm;