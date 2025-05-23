import React from "react";

// 인터페이스
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  label:string;
  name?:string;
  // placeholder?:string;
  // type?:string;
  // value?:string;
}

export function Input({name,label, ...props }: InputProps) {
  return (
    <div >
      <label htmlFor={name}>{label}</label>
    <input {...props} />
    </div>
  )
}
// 부모컴포넌트에서 직접 접근
// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({label,placeholder,type,name,value, ...props},ref)=>{
//     return (
//       <div>
//         {label && <label htmlFor={name}>{label}</label>}
//         <input
//           ref={ref}
//           type={type}
//           name={name}
//           placeholder={placeholder}
//           {...props}
//         />
//       </div>
//     )
//   }
// )

// // displayName
// Input.displayName = "Input";

// // 내보내기
// export default Input;