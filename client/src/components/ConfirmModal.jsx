import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Eliminar", cancelText = "Cancelar" }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, backdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{
            backgroundColor: 'var(--bg-secondary, #1e1e1e)',
            padding: '2rem',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '400px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
            border: '1px solid var(--border-color, #333)'
          }}
          onClick={e => e.stopPropagation()}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main, #fff)', fontSize: '1.25rem' }}>{title}</h3>
          <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-muted, #9ca3af)', fontSize: '0.95rem', lineHeight: '1.5' }}>
            {message}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button 
              type="button" 
              onClick={onClose}
              style={{
                padding: '0.5rem 1rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted, #9ca3af)',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-main, #fff)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted, #9ca3af)'}
            >
              {cancelText}
            </button>
            <button 
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              style={{
                padding: '0.5rem 1.25rem',
                background: '#ef4444',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#dc2626'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#ef4444'}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmModal;
