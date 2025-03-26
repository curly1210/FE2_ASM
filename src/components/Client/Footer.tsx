import logo_footer from "../../assets/footer_logo.png";

const Footer = () => {
  return (
    <div>
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
export default Footer;
