import React, { useState } from 'react';
import { register } from '../services/api';
import './Form.css';

// A props 'onSwitchToLogin' é recebida aqui
function RegisterForm({ onRegister, onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password });
      onRegister();
    } catch (error) {
      setError('Falha no cadastro. O usuário pode já existir.');
    }
  };

  return (
    <div className="form-page-container">
       <div className="auth-card">
        <h2>Crie sua Conta</h2>
        <p className="auth-subtitle">É rápido e fácil.</p>
        
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="reg-username">Usuário</label>
            <input
              type="text"
              id="reg-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Escolha um nome de usuário"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reg-password">Senha</label>
            <input
              type="password"
              id="reg-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crie uma senha segura"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Cadastrar</button>
        </form>

        <p className="switch-form-text">
          Já tem uma conta?{' '}
          <button onClick={onSwitchToLogin} className="link-button">
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;