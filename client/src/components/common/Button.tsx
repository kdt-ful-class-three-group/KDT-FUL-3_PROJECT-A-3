
import React from "react";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPlus } from 'react-icons/fa'
import { IoClose } from "react-icons/io5";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  icon?: 'search' | 'hamburger' | 'plus' | 'minus' | 'edit' | 'delete' | 'close';
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