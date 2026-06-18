import React from 'react';

const Card = ({ children, className = '', style, ...props }) => {
  return (
    <div className={`neo-card ${className}`} style={style} {...props}>
      {children}
    </div>
  );
};

export default Card;
