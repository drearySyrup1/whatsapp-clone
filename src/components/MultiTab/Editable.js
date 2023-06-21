import { PencilIcon } from "@heroicons/react/24/outline";
import Input from "../Input";
import { BsCheck2 } from "react-icons/bs";
import { useState } from "react";

const Editable = ({ className, value, callback, onChange }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const enableEditing = () => {
    setIsEditMode(true);
  };

  const disableEditing = () => {
    setIsEditMode(false);
    callback();
  };
  return (
    <>
      {isEditMode ? (
        <Input
          value={value}
          className="text-sm flex-grow bg-transparent "
          type="text"
          small
          onChange={onChange}
        />
      ) : (
        <p className={"text-sm flex-grow " + className}>{value}</p>
      )}

      <PencilIcon
        onClick={enableEditing}
        className={`${isEditMode && "hidden"} buttonhover h-8 w-8`}
      />
      <BsCheck2
        onClick={disableEditing}
        className={`${!isEditMode && "hidden"} buttonhover h-8 w-8`}
      />
    </>
  );
};

export default Editable;
