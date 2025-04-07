import logo from "../../assets/logo.png";
import toast from "react-hot-toast";
import { useAuthen } from "../../Context/AuthContext";
// import { Dispatch, SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../../Context/CartContext";

type NavigateProps = {
  setIsOpen: (isOpen: boolean) => void;
  navigate: ReturnType<typeof useNavigate>;
};

const Navigate = ({ setIsOpen, navigate }: NavigateProps) => {
  const { user, setUser } = useAuthen();
  const [isVisible, setIsVisible] = useState(true);
  const { quantityItem, setQuantityItem } = useCart();

  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current && currentScrollY > 100) {
        // Cuộn xuống
        setIsVisible(false);
      } else {
        // Cuộn lên
        setIsVisible(true);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Đăng xuất thành công");
    setQuantityItem(0);
    navigate("/");
  };

  const onCheckLogin = () => {
    if (user) {
      navigate("/carts");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div
      className={`w-full sticky top-0 left-0 z-50  bg-white shadow-md transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Start navigation section*/}
      <section className="container flex justify-between items-center max-w-7xl m-auto py-4 ">
        <Link to={"/"}>
          <img src={logo} alt="" />
        </Link>
        <ul className="flex justify-between gap-16 font-medium">
          <li>
            <a className="hover:text-amber-500" href="">
              Trang chủ
            </a>
          </li>
          <li>
            <a className="hover:text-amber-500" href="">
              Sản phẩm
            </a>
          </li>
          <li>
            <a className="hover:text-amber-500" href="">
              Giới thiệu
            </a>
          </li>
          <li>
            <a className="hover:text-amber-500" href="">
              Liên hệ
            </a>
          </li>
        </ul>
        <div className="flex gap-4">
          <div className="relative group inline-block">
            {/* Icon User */}
            <i className="fa-solid fa-user cursor-pointer "></i>

            {/* Dropdown menu */}
            <div
              className="absolute right-0 mt-1 w-40 bg-white shadow-lg  rounded-md border opacity-0 invisible 
        translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 overflow-hidden"
            >
              {user ? (
                <div>
                  <button
                    className="cursor-pointer block w-full px-4 py-2 text-left hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                  <button
                    className="cursor-pointer block w-full px-4 py-2 text-left hover:bg-gray-200"
                    onClick={() => navigate("/orders")}
                  >
                    Đơn mua
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="cursor-pointer block w-full px-4 py-2 text-left hover:bg-gray-200"
                    onClick={() => navigate("/login")}
                  >
                    Đăng nhập
                  </button>
                  <button
                    className="cursor-pointer block w-full px-4 py-2 text-left hover:bg-gray-200"
                    onClick={() => navigate("/register")}
                  >
                    Đăng ký
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <i
              className=" fa-solid fa-magnifying-glass"
              // onClick={() => testCart()}
            ></i>
          </div>
          <div>
            <i className="fa-solid fa-heart"></i>
          </div>
          <div className="relative">
            <i
              className="fa-solid fa-cart-shopping cursor-pointer"
              onClick={() => onCheckLogin()}
            ></i>
            <div
              className="absolute -top-4 -right-6"
              style={{
                backgroundColor: "red",
                borderRadius: "50%",
                padding: "3px 10px",
                // minWidth: "30px",
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              <motion.span
                key={quantityItem} // Thêm key để kích hoạt lại animation mỗi khi quantity thay đổi
                initial={{ opacity: 0, y: 50 }} // Bắt đầu từ dưới
                animate={{ opacity: 1, y: 0 }} // Di chuyển lên
                exit={{ opacity: 0, y: 50 }} // Khi giỏ hàng bị xóa
                transition={{
                  opacity: { duration: 0.3 }, // Thời gian fade-in
                  y: { type: "spring", stiffness: 300, damping: 20 }, // Chuyển động dọc
                }}
              >
                {quantityItem}
              </motion.span>
            </div>
          </div>
        </div>
      </section>
      {/* End navigation section*/}
    </div>
  );
};
export default Navigate;
