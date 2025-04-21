// src/components/common/Button.jsx
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  type = 'button',
  href, 
  to,
  disabled = false,
  className = '',
  onClick,
  ...props 
}) => {
  const buttonClasses = `
    btn 
    btn-${variant} 
    btn-${size}
    ${disabled ? 'btn-disabled' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  // If href is provided, render an anchor
  if (href) {
    return (
      <a 
        href={href} 
        className={buttonClasses}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }
  
  // If to is provided, render a Link (for react-router)
  if (to) {
    return (
      <Link 
        to={to} 
        className={buttonClasses}
        onClick={onClick}
        {...props}
      >
        {children}
      </Link>
    );
  }
  
  // Otherwise render a button
  return (
    <button 
      type={type} 
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;