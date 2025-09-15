import React, { useState } from 'react';
import { login } from '../services/api';
import './Form.css';

// A props 'onSwitchToRegister' é recebida aqui
function LoginForm({ onLogin, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      localStorage.setItem('token', response.data.token);
      onLogin();
    } catch (error) {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="form-page-container">
      <div className="auth-card">
        <h2>Bem-vindo de volta!</h2>
        <p className="auth-subtitle">Faça login para acessar sua agenda.</p>
        
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Entrar</button>
        </form>

        <p className="switch-form-text">
          Não tem uma conta?{' '}
          <button onClick={onSwitchToRegister} className="link-button">
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;