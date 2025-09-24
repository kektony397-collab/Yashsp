
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, title }) => {
  return (
    <div className={`bg-card border border-border rounded-lg p-4 shadow-lg ${className}`}>
      {title && (
        <h2 className="text-lg font-bold text-primary mb-3 font-mono uppercase tracking-wider border-b-2 border-primary/20 pb-2">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};
