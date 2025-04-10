import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";

const ModalContext = createContext()


export function Modal({children}){
    const [isOpen,setisOpen] = useState()
    const open =setisOpen
    const close =()=> setisOpen("")
    const windowref = useRef()
    return  <ModalContext.Provider value={{isOpen,close,open,windowref}}>
           {children}
    </ModalContext.Provider>
}

function Button({children,name}){
    const {open,close,windowref} = useContext(ModalContext)
    const modalref = useRef()
    useEffect(function(){
      function handleClose(e){
        if(modalref.current && !modalref.current.contains(e.target) && windowref.current && !windowref.current.contains(e.target)){

            close()
        }
      }
      document.addEventListener("click",handleClose)

      return()=> document.removeEventListener("click",handleClose)
    },[modalref,close])
    return <div ref={modalref}>
          {cloneElement(children, {onClick:()=>open(name)})}
    </div>
}

function Window({children,name}){
    const {open,isOpen,close,windowref} = useContext(ModalContext)

    if(name !== isOpen) return null;
    return <div className="  h-full top-0 absolute  right-0  left-0 bottom-0  flex  justify-center md:items-center" ref={windowref}>
        {cloneElement(children, {onClick :close })}
    </div>
}

Modal.Window = Window;
Modal.Button = Button;
