import React from "react";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPlus, FaEdit, FaTrash, FaChevronRight, FaArrowLeft } from 'react-icons/fa'
import { IoClose } from "react-icons/io5";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  icon?: 'search' | 'hamburger' | 'plus' | 'minus' | 'edit' | 'delete' | 'close' | 'chevron' | 'back';
  variant?: 'default' | 'icon';
  href?: string;
}

export function Button({ name, icon, ...props }: ButtonProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'search':
        return <CiSearch style={{ marginRight: '0.5rem', width:'30', height:'30'}} />;
      case 'hamburger':
        return <RxHamburgerMenu style={{ marginRight: '0.5rem', width:'25', height:'25'}} />;
      case 'plus':
        return <FaPlus style={{marginRight: '0.5rem'}}/>
      case 'close':
        return <IoClose style={{marginRight: '0.5rem'}}/>
      case 'edit':
        return <FaEdit style={{ marginRight: '0.5rem' }} />;
      case 'delete':
        return <FaTrash style={{ marginRight: '0.5rem' }} />;
      case 'chevron':
        return <FaChevronRight style={{ margin: '0 auto', color: '#4B5563', fontSize: '14px' }}/>;
      case 'back':
        return <FaArrowLeft style={{ margin: '0 auto', fontSize: '20px' }} />;
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