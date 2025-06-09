import React from "react";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPlus, FaEdit, FaTrash, FaChevronRight } from 'react-icons/fa'
import { IoClose } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { HiMiniChatBubbleOvalLeft } from "react-icons/hi2";
import { SiNaver } from "react-icons/si";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  icon?: 'search' | 'hamburger' | 'plus' | 'minus' | 'edit' | 'delete' | 'close' | 'chevron'|'google'|'kakao'|'naver';
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
      case 'google':
        return <FaGoogle className="text-2xl text-white"/>
      case 'kakao':
        return <HiMiniChatBubbleOvalLeft className="text-3xl text-white" />
      case 'naver':
        return <SiNaver className="text-1xl text-white"/>
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