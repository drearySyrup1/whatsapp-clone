import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
          bg-emerald-700 p-2 rounded-md
        transition-[box-shadow, scale] duration-300
        hover:shadow-[0_0_7px_0_theme(colors.emerald.800)]
        active:scale-[.97]
        `}
    >
      {children}
    </button>
  );
};

export default Button;
