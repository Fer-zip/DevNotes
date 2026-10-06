import React from 'react';
import { X, BookOpen, Code, Image as ImageIcon, Table as TableIcon, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ zIndex: 1000 }}
      >
        <motion.div 
          className="modal-content"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={e => e.stopPropagation()}
          style={{ maxWidth: '600px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }}
        >
          <div className="modal-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={20} color="var(--brand-color)" />
              <h3 style={{ margin: 0 }}>Guía de Uso: DevBrain</h3>
            </div>
            <button className="close-btn" onClick={onClose}><X size={18} /></button>
          </div>
          
          <div className="modal-body" style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>
            
            <section style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-color)' }}>
                <TableIcon size={16} /> Tablas
              </h4>
              <p>Para insertar una tabla, usa el ícono de la barra superior. Al hacer clic <strong>dentro</strong> de la tabla, aparecerán nuevas opciones en la barra superior para:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Añadir/Eliminar columnas (flechas horizontales)</li>
                <li>Añadir/Eliminar filas (flechas verticales)</li>
                <li>Combinar celdas (merge) o eliminar la tabla completa.</li>
              </ul>
            </section>

            <section style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-color)' }}>
                <ImageIcon size={16} /> Imágenes
              </h4>
              <p>Puedes añadir imágenes de varias formas:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Haciendo clic en el ícono de imagen para subir un archivo desde tu PC.</li>
                <li>Haciendo <strong>Ctrl + V</strong> (Pegar) directamente en el editor luego de hacer una captura de pantalla.</li>
              </ul>
              <p style={{ fontSize: '0.9em', color: 'var(--text-muted)' }}>*Nota: Las imágenes tienen un tamaño optimizado. Haz clic y mantén presionado sobre una imagen para hacerle zoom.</p>
            </section>

            <section style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-color)' }}>
                <Code size={16} /> Diagramas Automáticos (Mermaid)
              </h4>
              <p>Has descubierto la herramienta secreta de los programadores. "Mermaid" convierte texto simple en gráficos profesionales. Aquí tienes los 3 más útiles (solo cópialos y pégalos en el bloque negro):</p>
              
              <div style={{ marginTop: '1rem' }}>
                <strong>1. Flujograma (Decisiones)</strong>
                <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', fontSize: '0.9em', marginTop: '0.5rem' }}>
{`graph TD;
    A[Idea Principal] --> B{¿Es buena?};
    B -- Sí --> C[Desarrollar];
    B -- No --> D[Descartar];`}
                </pre>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <strong>2. Gráfico de Pastel (Porcentajes)</strong>
                <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', fontSize: '0.9em', marginTop: '0.5rem' }}>
{`pie title Lenguajes Favoritos
    "Python" : 45
    "JavaScript" : 30
    "Java" : 15
    "Otros" : 10`}
                </pre>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <strong>3. Diagrama de Secuencia (Paso a Paso)</strong>
                <pre style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', fontSize: '0.9em', marginTop: '0.5rem' }}>
{`sequenceDiagram
    participant Usuario
    participant Servidor
    Usuario->>Servidor: Solicitud de Login
    Servidor-->>Usuario: Acceso Concedido`}
                </pre>
              </div>
              <p style={{ marginTop: '1rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>Tip: ¡Solo escribe el bloque de texto y dale a Renderizar! Puedes volver a editarlo haciendo clic en el lápiz.</p>
            </section>

            <section style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-color)' }}>
                <Settings size={16} /> Configuración de la Aplicación
              </h4>
              <p>Puedes personalizar el aspecto de la aplicación entrando a <strong>Configuración</strong> en la barra lateral:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li><strong>Temas:</strong> Alterna entre el Tema Claro (iluminado y limpio) y el Tema Oscuro (ideal para estudiar de noche o evitar fatiga visual).</li>
                <li><strong>Colores:</strong> Elige tu color principal favorito (Azul, Menta, Morado, Rosa o Amarillo) para que todo el bloc de notas combine contigo.</li>
              </ul>
            </section>

          </div>
          
          <div className="modal-footer" style={{ justifyContent: 'center' }}>
            <button className="primary-btn" onClick={onClose}>¡Entendido!</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GuideModal;
