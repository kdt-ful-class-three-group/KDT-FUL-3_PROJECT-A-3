import React from "react";

// 인터페이스
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  placeholder?:string;
  type?:string;
  name?:string;
  value?:string;
}

// 부모컴포넌트에서 직접 접근
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({placeholder,type,name,value, ...props},ref)=>{
    return (
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          {...props}
        />
    )
  }
)

// displayName
Input.displayName = "Input";

// 내보내기
export default Input;