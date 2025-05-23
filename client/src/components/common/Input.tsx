import React from "react";

// 인터페이스
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  label:string;
  placeholder?:string;
  type?:string;
  name?:string;
}

// 부모컴포넌트에서 직접 접근
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({label,placeholder,type,name,value, ...props},ref)=>{
    return (
      <div>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          {...props}
        />
      </div>
    )
  }
)

// displayName
Input.displayName = "Input";

// 내보내기
export default Input;