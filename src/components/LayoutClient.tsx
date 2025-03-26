import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigate from "./Client/Navigate";
import Footer from "./Client/Footer";
import ModalRequireLogin from "./Client/ModalRequireLogin";

type LayoutClientProps = {
  children: React.ReactNode;
};

const LayoutClient = ({ children }: LayoutClientProps) => {
  const [isOpen, setIsOpen] = useState(false);
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
