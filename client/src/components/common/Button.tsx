
import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  icon?: 'search' | 'hamburger' | 'plus' | 'minus' | 'edit' | 'delete';
  variant?: 'default' | 'icon';
  href?: string;
}

export function Button({ name, icon, ...props }: ButtonProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'search':
        return <FaSearch style={{ marginRight: '0.5rem' }} />;
      case 'hamburger':
        return <FaBars style={{ marginRight: '0.5rem' }} />;
      default:
        return null;
    }
  };

  return (
    <button {...props}>
      {renderIcon()}
      {name}
    </button>
  );
}