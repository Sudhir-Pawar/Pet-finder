import React, { useEffect, useRef, FunctionComponent } from "react";
import { createPortal } from "react-dom";

const modal = document.getElementById("modal");
const Modal: FunctionComponent = ({ children }) => {
  const elRef = useRef(document.createElement("div"));

  useEffect(() => {
    if (!modal) {
      return;
    }
    modal.appendChild(elRef.current);
    return () => {
      modal.removeChild(elRef.current);
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};
export default Modal;
