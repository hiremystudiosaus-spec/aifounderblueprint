import React, { useState } from 'react';

const Accordion = ({ title, children, bgColor = 'var(--bg-card-blue)' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="accordion-container"
      style={{
        border: 'var(--border-thick)',
        borderRadius: '12px',
        marginBottom: '16px',
        backgroundColor: bgColor,
        overflow: 'hidden'
      }}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: '600',
          fontSize: '1.125rem',
          textAlign: 'left'
        }}
      >
        <span>{title}</span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div style={{ padding: '0 24px 24px 24px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
