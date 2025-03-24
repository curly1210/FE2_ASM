import logo from "../assets/logo.png";
import logo_footer from "../assets/footer_logo.png";
import { useNavigate } from "react-router-dom";
import { useAuthen } from "../Context/AuthContext";
import toast from "react-hot-toast";

type LayoutClientProps = {
  children: React.ReactNode;
};

const LayoutClient = ({ children }: LayoutClientProps) => {
  const { user, setUser } = useAuthen();
  const navigate = useNavigate();
  // console.log(user);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Đăng xuất thành công");
    navigate("/");
  };

  return (
    <div>
      {/* Start navigation section*/}
      <section className="container flex justify-between items-center max-w-7xl m-auto py-4 ">
        <img src={logo} alt="" />
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
                <button
                  className="cursor-pointer block w-full px-4 py-2 text-left hover:bg-gray-200"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập
                </button>
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
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
      </section>
      {/* End navigation section*/}

      {children}

      {/* Start footer section */}
      <footer className="bg-[#262626] text-white">
        <div className="container max-w-7xl m-auto grid grid-cols-4 gap-8 py-16">
          <div>
            <img src={logo_footer} className="mb-4" alt="" />
            <p>400 University Drive Suite 200 Coral Gables, FL 33134 USAs</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-4">Sitemap</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="">Trang chủ</a>
              </li>
              <li>
                <a href="">Cửa hàng</a>
              </li>
              <li>
                <a href="">Liên hệ</a>
              </li>
              <li>
                <a href="">Giới thiệu</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-4">Help</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="">Thanh toán</a>
              </li>
              <li>
                <a href="">Hoàn trả</a>
              </li>
              <li>
                <a href="">Chính sách</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-4">Location</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="">cuong@gmail.com</a>
              </li>
              <li>
                <a href="">Bắc Từ Liêm - Hà Nội</a>
              </li>
              <li>
                <a href="">0898645517</a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="container max-w-7xl m-auto text-[#D9D9D9]" />
        <p className="text-center py-8">
          Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved.
        </p>
      </footer>
      {/* End footer section */}
    </div>
  );
};
export default LayoutClient;
