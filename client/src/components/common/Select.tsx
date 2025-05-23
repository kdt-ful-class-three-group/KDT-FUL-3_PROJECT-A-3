import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  option: { name: string; value: string }[];
}

export function Select({option, ...props }: SelectProps) {
  return (
    <select {...props}>
      {option.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}