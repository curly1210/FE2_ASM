/* eslint-disable @typescript-eslint/no-explicit-any */
import galery_1 from "../../assets/gallery_1.jpg";
import galery_2 from "../../assets/gallery_2.png";
import galery_3 from "../../assets/gallery_3.png";
import galery_4 from "../../assets/gallery_4.png";
import galery_5 from "../../assets/gallery_5.png";
import galery_6 from "../../assets/gallery_6.png";
import account from "../../assets/account.png";
import award from "../../assets/award.png";
import ship from "../../assets/ship.png";
import check from "../../assets/check.png";
import banner from "../../assets/banner.jpg";
import { Link } from "react-router-dom";
import useList from "../../hooks/useList";
import { useCart } from "../../Context/CartContext";

const HomePage = () => {
  const { data } = useList({ resource: "products" });

  const { onAddToCart, formatCurrency } = useCart();

  return (
    <div>
      {/* Start banner */}
      <section>
        <img src={banner} className="w-full" alt="" />
      </section>

      {/* End banner */}

      {/* Start product section */}
      <section className="container max-w-7xl m-auto mt-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-[40px]">Sản phẩm mới</h2>
          <Link
            to={""}
            className="border border-solid border-yellow-500 px-4 py-2 font-semibold text-yellow-500"
          >
            Xem tất cả
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-8">
          {data?.map((product: any) => (
            <div key={product.id}>
              <div className="overflow-hidden">
                <Link to={`/detail-product/${product.id}`}>
                  <img
                    src={product.image}
                    alt=""
                    className="hover:scale-125 w-full h-72  duration-300"
                  />
                </Link>
              </div>
              <div className="bg-[#F5F5F5]  p-4">
                <Link
                  to={`/detail-product/${product.id}`}
                  className="w-fit inline-block"
                >
                  <h3 className="font-semibold text-xl mb-1 w-fit">
                    {product.name}
                  </h3>
                </Link>
                {/* <p className="text-[#898989] text-base mb-2">
                  Stylish cafe chair
                </p> */}
                <p className="font-semibold text-xl text-red-600 mb-3">
                  {formatCurrency(product.price)}
                </p>
                <button
                  onClick={() => onAddToCart(Number(product.id), 1)}
                  className="border border-solid duration-300 cursor-pointer hover:bg-yellow-700 hover:text-white border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2"
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* End product section */}

      {/* Start gallery section */}
      <section className="container max-w-7xl m-auto mt-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-[40px]">Phòng trưng bày</h2>
          <Link
            to={"/"}
            className="border border-solid border-yellow-500 px-4 py-2 font-semibold text-yellow-500"
          >
            Xem tất cả
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <img src={galery_1} alt="" />
          <img src={galery_2} alt="" />
          <img src={galery_3} alt="" />
          <img src={galery_4} alt="" />
          <img src={galery_5} alt="" />
          <img src={galery_6} alt="" />
        </div>
      </section>
      {/* Start gallery section */}

      <section className="bg-[#FFF7ED] py-16 mt-16">
        <div className="container max-w-7xl m-auto grid grid-cols-4">
          <div className="flex gap-5 items-center">
            <img src={award} alt="" />
            <div>
              <h3 className="font-semibold text-xl mb-1">High Quality</h3>
              <p className="text-[#898989]">Crafted from top materials</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <img src={account} alt="" />
            <div>
              <h3 className="font-semibold text-xl mb-1">24 / 7 Support</h3>
              <p className="text-[#898989]">Dedicated support</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <img src={check} alt="" />
            <div>
              <h3 className="font-semibold text-xl mb-1">
                Warranty Protection
              </h3>
              <p className="text-[#898989]">Over 2 years</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <img src={ship} alt="" />
            <div>
              <h3 className="font-semibold text-xl mb-1">Free Shipping</h3>
              <p className="text-[#898989]">Order over 150 $</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
