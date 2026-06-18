import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClass = 'neo-btn';
  const variantClass = variant === 'primary' ? 'neo-btn-primary' : 'neo-btn-secondary';
  
  return (
    <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
