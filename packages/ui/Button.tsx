import React from "react";

export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button style={{ padding: 8, background: '#222', color: '#fff', borderRadius: 4 }} {...props}>
    {children}
  </button>
);
