import React from "react";

const Option = ({ children, onClick, name, openTabName }) => {
  return (
    <div
      onClick={onClick}
      className={`hover:bg-[rgb(255_255_255_/_.15)]
          py-1.5 px-3 rounded-md
          text-sm cursor-pointer
          flex items-center gap-3
          relative overflow-hidden
          ${
            name === openTabName &&
            `bg-[rgb(255_255_255_/_.15)]
            before:content-['']
            before:w-1
            before:h-4
            before:bg-emerald-800
            before:absolute
            before:left-0
            before:rounded-md
            before:animate-grow2
            before:shadow-[0_0_10px_2px_theme(colors.emerald.900)]
            `
          }
          `}
    >
      {children}
    </div>
  );
};

export default Option;
