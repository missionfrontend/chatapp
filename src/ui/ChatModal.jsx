import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const ChatModalContext = createContext();

function ChatModal({ children }) {
  const [isOpen, setisOpen] = useState("");
  const windowref = useRef()
  const close = () => setisOpen("");
  const open = setisOpen;
  return (
    <ChatModalContext.Provider value={{ open, isOpen, close,windowref }}>
      {children}
    </ChatModalContext.Provider>
  );
}

function Button({ children, id }) {
  const { open, close, isOpen,windowref } = useContext(ChatModalContext);
  const ref = useRef(null);
  useEffect(
    function () {
        function handleClose(e) {
        
        
        if(ref.current && !ref.current.contains(e.target) && windowref.current && !windowref.current.contains(e.target)){
          close();
        }
        
      }
      document.addEventListener("click", handleClose, true);

      return () => document.removeEventListener("click", handleClose, true);
    },
    [close,ref,windowref]
  );
  return (
    <div ref={ref}>{cloneElement(children, { onClick: () => isOpen === id ? open("") : open(id) })}</div>
  );
}

function Window({ children, id }) {
  const { isOpen,windowref ,close} = useContext(ChatModalContext);

  if (isOpen !== id) return;
  return <div className="absolute right-5 top-12" ref={windowref}>{cloneElement(children, {CloseModel:close})}</div>;
}

export default ChatModal;

ChatModal.Button = Button;
ChatModal.Window = Window;
