import React from 'react';
import './FormModal.css';

function FormModal({ children, onClose }) {
  // Esta função fecha o modal se o usuário clicar no fundo escuro (overlay)
  const handleOverlayClick = (e) => {
    // Verifica se o clique foi diretamente no overlay, e não no conteúdo do modal
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {/* 'children' é o conteúdo que passamos para o modal, 
            neste caso o <h2> e o <TaskForm> */}
        {children}
      </div>
    </div>
  );
}

export default FormModal;