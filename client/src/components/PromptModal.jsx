import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PromptModal = ({ isOpen, onClose, onSubmit, title, placeholder }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (isOpen) {
      setInputValue('');
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue.trim());
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
              backgroundColor: 'var(--bg-secondary)',
              padding: '2rem',
              borderRadius: '16px',
              width: '90%',
              maxWidth: '400px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
              border: '1px solid var(--border-color)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-main)', fontSize: '1.25rem' }}>{title}</h3>
            <form onSubmit={handleSubmit}>
              <input 
                autoFocus
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder={placeholder}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-main)',
                  outline: 'none',
                  fontSize: '1rem',
                  marginBottom: '1.5rem',
                  fontFamily: 'inherit'
                }}
              />
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  onClick={onClose}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  style={{
                    padding: '0.5rem 1.25rem',
                    background: 'var(--brand-color)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Crear
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromptModal;
