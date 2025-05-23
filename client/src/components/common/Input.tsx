import React from "react";

// 인터페이스
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  lable?:string;
  palceholder?:string;
  type?:string;
  name?:string;
}

// 부모컴포넌트에서 직접 접근

// displayName

// 내보내기