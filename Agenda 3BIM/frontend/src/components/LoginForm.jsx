// frontend/src/components/LoginForm.jsx

import React, { useState } from 'react';
import { login } from '../services/api'; 
import './Form.css';

// 1. Receba 'onSwitchToRegister' aqui
const LoginForm = ({ onLogin, onSwitchToRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await login(username, password);
            localStorage.setItem('token', response.data.token);
            onLogin();
        } catch (err) {
            setError('Falha no login. Verifique seu usuário e senha.');
            console.error('Login failed', err);
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Usuário</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="btn btn-primary">Entrar</button>

                {/* 2. Adicione o link para registro aqui */}
                <div className="switch-form-text" style={{ marginTop: '15px', textAlign: 'center' }}>
                  <p>
                    Não tem uma conta?{' '}
                    <button type="button" onClick={onSwitchToRegister} className="btn btn-link">
                      Registre-se
                    </button>
                  </p>
                </div>
                
            </form>
        </div>
    );
};

export default LoginForm;