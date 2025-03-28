import logo from "../../assets/logo.png";
import toast from "react-hot-toast";
import { useAuthen } from "../../Context/AuthContext";
// import { Dispatch, SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";

type NavigateProps = {
  setIsOpen: (isOpen: boolean) => void;
  navigate: ReturnType<typeof useNavigate>;
};

const Navigate = ({ setIsOpen, navigate }: NavigateProps) => {
  const { user, setUser } = useAuthen();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Đăng xuất thành công");
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
    <div>
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
                <button
                  className="cursor-pointer block w-full px-4 py-2 text-left hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
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
            <i className=" fa-solid fa-magnifying-glass"></i>
          </div>
          <div>
            <i className="fa-solid fa-heart"></i>
          </div>
          <div>
            <i
              className="fa-solid fa-cart-shopping cursor-pointer"
              onClick={() => onCheckLogin()}
            ></i>
          </div>
        </div>
      </section>
      {/* End navigation section*/}
    </div>
  );
};
export default Navigate;
