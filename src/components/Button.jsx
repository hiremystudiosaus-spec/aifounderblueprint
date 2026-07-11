import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', className = '', to, ...props }) => {
  const baseClass = 'neo-btn';
  const variantClass = variant === 'primary' ? 'neo-btn-primary' : 'neo-btn-secondary';
  const combinedClass = `${baseClass} ${variantClass} ${className}`;
  
  if (to) {
    return (
      <Link to={to} className={combinedClass} {...props}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
