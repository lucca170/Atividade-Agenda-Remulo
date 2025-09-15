import React, { useState, useEffect } from 'react';

function TaskForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pendente'); // Define 'pendente' como padrão

  useEffect(() => {
    // Se estiver editando uma tarefa, preenche o formulário com os dados dela
    if (task) {
      setTitle(task.title);
      setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
      setStatus(task.status);
    } else {
      // Se for uma nova tarefa, reseta o formulário
      setTitle('');
      setDueDate('');
      setStatus('pendente');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...task, title, dueDate, status });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="task-title">Título</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Estudar React"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="task-dueDate">Data de Vencimento</label>
        <input
          id="task-dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="task-status">Status</label>
        <select 
            id="task-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
        >
            <option value="pendente">Pendente</option>
            <option value="concluída">Concluída</option>
        </select>
      </div>

      <div className="modal-actions">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          Salvar Tarefa
        </button>
      </div>
    </form>
  );
}

export default TaskForm;