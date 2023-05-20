import React from "react";

const IPComponent: React.FC<{ defined: boolean; setDefined: React.Dispatch<React.SetStateAction<boolean>> }> = ({ defined, setDefined }) => {
  return (
    <div className="d-flex switch position-absolute end-0 p-2 text-center justify-content-center gap-1">
      <input className="form-check-input" type="checkbox" checked={defined} aria-label="Checkbox for following text input" onChange={()=>setDefined(!defined)}/>
      <div className="col mt-1">Defined</div>
    </div>
  );
};

export default IPComponent;
