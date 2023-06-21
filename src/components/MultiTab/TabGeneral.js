import React from "react";
import { useSelector } from "react-redux";

const TabGeneral = ({ children, className, key }) => {
  const { fadein, fadeout } = useSelector((state) => state.multiTab);
  return (
    <div
      key={key}
      className={
        `${fadein && "fadein"} ${fadeout && "fadeout"} 
        p-5 bg-zinc-800 ` + className
      }
    >
      {children}
    </div>
  );
};

export default TabGeneral;
