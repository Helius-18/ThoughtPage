import React from "react";

const IPComponent: React.FC<{ checked: boolean; setChecked: React.Dispatch<React.SetStateAction<boolean>> }> = ({ checked, setChecked }) => {
  return (
    <div className="d-flex switch position-absolute end-0 p-2 text-center justify-content-center gap-1">
      <input className="form-check-input" type="checkbox" checked={checked} aria-label="Checkbox for following text input" onChange={()=>setChecked(!checked)}/>
      <div className="col mt-1">Defined</div>
    </div>
  );
};

export default IPComponent;
