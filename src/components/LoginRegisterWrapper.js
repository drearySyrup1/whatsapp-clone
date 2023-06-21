import React from "react";

const LoginRegisterWrapper = ({ children }) => {
  return (
    <div
      className="w-screen h-screen 
grid place-items-center"
    >
      <div
        className="flex flex-col gap-3 
      bg-zinc-900 w-[clamp(100px,95%,400px)] p-10
      sm:w-[400px]
      rounded-lg shadow-[0_0_30px_rgb(0_0_0_/_.5)]
      animate-grow2
      "
      >
        {children}
      </div>
    </div>
  );
};

export default LoginRegisterWrapper;
