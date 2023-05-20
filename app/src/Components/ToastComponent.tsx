import React, {useLayoutEffect} from "react";

const ToastComponent: React.FC<{message: string, setToast: React.Dispatch<React.SetStateAction<boolean>>}> = ({message, setToast}) => {
    useLayoutEffect(() => {
        setTimeout(()=>{
            setToast(false);
        },5000)
    })
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3 text-light">
      <div
        id="liveToast"
        className="toast fade show bg-dark d-flex align-items-center justify-content-between"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-body">{message}</div>
        <button
            type="button"
            className="btn-close m-2 p-2"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={()=>setToast(false)}
          ></button>
      </div>
    </div>
  );
};

export default ToastComponent;
