import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Edit2, Check } from 'lucide-react';

mermaid.initialize({ startOnLoad: false, theme: 'dark' });

const MermaidComponent = (props) => {
  const { node, updateAttributes, selected } = props;
  const [isEditing, setIsEditing] = useState(!node.attrs.code);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isEditing && node.attrs.code && containerRef.current) {
      containerRef.current.innerHTML = '';
      try {
        mermaid.render('mermaid-' + Math.random().toString(36).substr(2, 9), node.attrs.code)
          .then((result) => {
            if (containerRef.current) {
              containerRef.current.innerHTML = result.svg;
            }
          })
          .catch(err => {
            if (containerRef.current) {
              containerRef.current.innerHTML = `<div style="color: #ef4444; padding: 1rem; border: 1px solid #ef4444; border-radius: 8px;">Error de sintaxis Mermaid</div>`;
            }
          });
      } catch (e) {
        console.error(e);
      }
    }
  }, [node.attrs.code, isEditing]);

  return (
    <NodeViewWrapper className={`mermaid-node ${selected ? 'ProseMirror-selectednode' : ''}`} style={{ margin: '1rem 0', position: 'relative' }}>
      {isEditing ? (
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--brand-color)' }}>
          <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--brand-color)' }}>Editor de Diagrama (Mermaid)</span>
            <button 
              onClick={() => setIsEditing(false)}
              style={{ background: 'var(--brand-color)', color: 'white', border: 'none', padding: '0.2rem 0.5rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Check size={14} /> Renderizar
            </button>
          </div>
          <textarea
            value={node.attrs.code}
            onChange={(e) => updateAttributes({ code: e.target.value })}
            placeholder="graph TD;\nA-->B;"
            style={{ width: '100%', minHeight: '100px', background: '#000', color: '#fff', padding: '0.5rem', fontFamily: 'monospace', borderRadius: '4px', border: '1px solid var(--border-color)', resize: 'vertical' }}
          />
        </div>
      ) : (
        <div 
          style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', position: 'relative', minHeight: '100px', display: 'flex', justifyContent: 'center' }}
        >
          <div ref={containerRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }} />
          <button 
            onClick={() => setIsEditing(true)}
            style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', padding: '0.3rem', borderRadius: '4px', cursor: 'pointer' }}
          >
            <Edit2 size={16} />
          </button>
        </div>
      )}
    </NodeViewWrapper>
  );
};

export const Mermaid = Node.create({
  name: 'mermaid',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      code: {
        default: 'graph TD;\n    A-->B;\n    A-->C;\n    B-->D;\n    C-->D;',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'mermaid-node',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['mermaid-node', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MermaidComponent);
  },
});
