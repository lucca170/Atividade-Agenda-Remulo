// frontend/src/components/ForgotPasswordForm.jsx

import React, { useState } from 'react';
import { requestPasswordReset } from '../services/api'; // Vamos criar essa função a seguir
import './Form.css';

const ForgotPasswordForm = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      await requestPasswordReset(email);
      setMessage('Se um e-mail correspondente for encontrado, um link de recuperação será enviado.');
    } catch (err) {
      setError('Ocorreu um erro ao tentar enviar o e-mail. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Recuperar Senha</h2>
      <p>Digite seu e-mail para receber um link de redefinição de senha.</p>
      <form onSubmit={handleSubmit}>
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
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar Link'}
        </button>
        <div className="switch-form-text" style={{ marginTop: '15px', textAlign: 'center' }}>
          <p>
            Lembrou a senha?{' '}
            <button type="button" onClick={onSwitchToLogin} className="btn btn-link">
              Voltar para o Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;