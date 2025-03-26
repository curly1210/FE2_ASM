import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navigate from "./Client/Navigate";
import Footer from "./Client/Footer";
import ModalRequireLogin from "./Client/ModalRequireLogin";
import { useModal } from "../Context/ModalContext";

type LayoutClientProps = {
  children: React.ReactNode;
};

const LayoutClient = ({ children }: LayoutClientProps) => {
  const { isOpen, setIsOpen } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    // return () => {
    //   document.documentElement.style.overflow = "";
    // };
  }, [isOpen]);

  return (
    <div>
      <Navigate setIsOpen={setIsOpen} navigate={navigate} />
      {children}

      <Footer />

      <ModalRequireLogin
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navigate={navigate}
      />
    </div>
  );
};
export default LayoutClient;
