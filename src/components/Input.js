import React from "react";

const Input = ({ onChange, placeholder, type, value, className, small }) => {
  return (
    <div
      className={
        `flex items-center rounded-md 
        border-b border-b-zinc-400 
        bg-zinc-700 px-3 py-2 
        transition-[border] 
        duration-200 
        focus-within:border-b-[2px] 
        focus-within:border-green-500
        h-[${small ? "30px" : "40px"}] ` + className
      }
    >
      <input
        onChange={onChange}
        placeholder={placeholder}
        className="flex-grow bg-transparent text-sm placeholder:text-sm focus:outline-none"
        type={type}
        value={value}
      />
    </div>
  );
};

export default Input;
