// frontend/src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

// Esta página irá gerenciar a exibição dos formulários de autenticação
const AuthPage = () => {
    const [authView, setAuthView] = useState('login'); // 'login', 'register', ou 'forgotPassword'
    const navigate = useNavigate();

    const handleLogin = () => {
        // Após o login, navega para o dashboard
        navigate('/'); 
    };

    // Se o usuário já estiver logado, não deveria estar nesta página.
    // O componente App.jsx cuidará desse redirecionamento.

    return (
        <div className="auth-container">
            {authView === 'login' && (
                <LoginForm
                    onLogin={handleLogin}
                    onSwitchToRegister={() => setAuthView('register')}
                    onSwitchToForgotPassword={() => setAuthView('forgotPassword')}
                />
            )}
            {authView === 'register' && (
                <RegisterForm
                    onRegisterSuccess={() => setAuthView('login')}
                    onSwitchToLogin={() => setAuthView('login')}
                />
            )}
            {authView === 'forgotPassword' && (
                <ForgotPasswordForm
                    onSwitchToLogin={() => setAuthView('login')}
                />
            )}
        </div>
    );
};

export default AuthPage;