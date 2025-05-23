import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
}

export function Button({ name, ...props }: ButtonProps) {
  return (
    <button {...props}>
      {name}
    </button>
  )
}