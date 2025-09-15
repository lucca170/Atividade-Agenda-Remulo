// frontend/src/components/RegisterForm.jsx

import React, { useState } from 'react';
import api from '../services/api';
import './FormModal.css';

function RegisterForm({ onRegisterSuccess, onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // --- ADIÇÃO AQUI ---
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isLoading) return; // Impede submissões múltiplas
    
    setIsLoading(true); // Desativa o botão
    setError('');

    try {
      await api.post('users/', { username, email, password });
      alert('Utilizador registado com sucesso! Faça o login para continuar.');
      onRegisterSuccess();
    } catch (err) {
      const errorMessage = Object.values(err.response.data).join('\n');
      setError(`Não foi possível realizar o registo:\n${errorMessage}`);
      console.error('Falha no registo', err.response.data);
    } finally {
      setIsLoading(false); // Reativa o botão no final
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Criar Conta</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Utilizador</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Palavra-passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="form-actions">
          {/* --- ALTERAÇÃO AQUI --- */}
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'A registar...' : 'Registar'}
          </button>
        </div>
        <div className="switch-form-text">
          <p>
            Já tem uma conta?{' '}
            <button type="button" onClick={onSwitchToLogin}>
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;