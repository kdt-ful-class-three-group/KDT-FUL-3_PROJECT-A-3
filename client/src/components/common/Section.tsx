import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const Section = ({ title, description, children, className, ...props }: SectionProps) => {
  return (
    <section className={className} {...props}>
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
      <div>
        {children}
      </div>
    </section>
  );
};