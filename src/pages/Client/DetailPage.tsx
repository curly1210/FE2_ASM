/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import detail_1 from "../../assets/detail-1.jpg";
import detail_2 from "../../assets/detail-2.jpg";
import { useParams } from "react-router-dom";
import useOne from "../../hooks/useOne";
import { useState } from "react";
import { useCart } from "../../Context/CartContext";

const DetailPage = () => {
  const { id: idProduct } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { onAddToCart, formatCurrency } = useCart();

  const { data: product, isLoading } = useOne({
    resource: "products",
    id: Number(idProduct),
  });

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setQuantity(value === "" ? 0 : Number(value));
    }
  };

  const onHandleQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  if (isLoading) return <div>Loading...</div>;

  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <section className="container max-w-7xl m-auto my-16 ">
      <div>
        <div className="grid grid-cols-2 gap-8">
          <div className="grid grid-cols-6 gap-8">
            <div className="col-span-1 *:mb-4">
              <img src={product?.image} alt="" />
            </div>
            <div className="col-span-5">
              <img src={product?.image} alt="" />
            </div>
          </div>
          {/* End slide image */}
          <div>
            <p className="font-medium text-xl">{product?.name}</p>
            <p className="font-bold text-[40px] text-[#EF4444] my-2">
              {formatCurrency(product?.price)}
            </p>
            <div className="flex items-center">
              <div className="flex gap-2 border-r border-solid border-neutral-500 pr-4 mr-4 ">
                <i className="fa-solid fa-star text-yellow-500"></i>
                <i className="fa-solid fa-star text-yellow-500"></i>
                <i className="fa-solid fa-star text-yellow-500"></i>
                <i className="fa-solid fa-star text-yellow-500"></i>
                <i className="fa-solid fa-star text-yellow-500"></i>
              </div>
              <span className="font-medium text-sm text-[#9F9F9F]">
                5 khách hàng review
              </span>
            </div>
            <p className="font-medium my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint rem
              optio ab, similique deleniti eos corporis cum eaque dignissimos
              molestias deserunt, porro repellendus animi eligendi! Perspiciatis
              officia aliquid vitae dolorem.
            </p>
            <div>
              <div className="border border-solid border-neutral-400 w-fit rounded inline-block">
                <button
                  onClick={() => onHandleQuantity(quantity - 1)}
                  className="py-2 px-4"
                >
                  -
                </button>
                <input
                  // defaultValue={1}
                  value={quantity}
                  onChange={onHandleChange}
                  className="w-[30px] text-center"
                  type="text"
                />
                <button
                  onClick={() => onHandleQuantity(quantity + 1)}
                  className="py-2 px-4"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => onAddToCart(Number(idProduct), quantity)}
                className="border border-solid border-yellow-600 text-yellow-600 rounded ml-3 py-2 px-10 hover:bg-yellow-600 hover:text-white duration-200"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
          {/* End short description */}
        </div>
        <div className="mt-16">
          <div className="*:font-semibold *:text-xl *:mr-16 border-b pb-4 mb-8 border-neutral-400">
            <a href="#">Chi tiết</a>
            <a href="#" className="text-[#A3A3A3]">
              Thông tin thêm
            </a>
            <a className="text-[#A3A3A3]" href="#">
              Đánh giá
            </a>
          </div>
          <div className="*:text-[#A3A3A3] *:font-medium">
            <p className="mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur, voluptates. Cumque ratione rem inventore voluptatibus
              iure commodi ut vero explicabo itaque aperiam dolor, officia
              quaerat accusamus necessitatibus optio ad mollitia?
            </p>
            <p className="mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error non
              corrupti unde officiis sapiente beatae mollitia minima
              voluptatibus ut placeat maiores ipsa nam tenetur quaerat, est
              illo. Aspernatur, architecto vitae?
            </p>
            <div className="flex gap-8">
              <img src={detail_1} alt="" />
              <img src={detail_2} alt="" />
            </div>
          </div>
        </div>
      </div>
      <section className="container max-w-7xl m-auto mt-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-[40px]">Sản phẩm liên quan</h2>
        </div>
        <div className="grid grid-cols-4 gap-8">
          <div>
            <div className="overflow-hidden">
              <img
                src={detail_1}
                className="hover:scale-125 w-full h-72  duration-300"
              />
            </div>
            <div className="bg-[#F5F5F5]  p-4">
              <h3 className="font-semibold text-xl mb-1">San pham 1</h3>
              <p className="text-[#898989] text-base mb-2">
                Stylish cafe chair
              </p>
              <p className="font-semibold text-xl text-red-600 mb-3">25.000đ</p>
              <button className="border border-solid duration-300 cursor-pointer hover:bg-yellow-700 hover:text-white border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2">
                Thêm vào giỏ
              </button>
            </div>
          </div>
          <div>
            <div className="overflow-hidden">
              <img
                src={detail_1}
                className="hover:scale-125 w-full h-72  duration-300"
              />
            </div>
            <div className="bg-[#F5F5F5]  p-4">
              <h3 className="font-semibold text-xl mb-1">San pham 1</h3>
              <p className="text-[#898989] text-base mb-2">
                Stylish cafe chair
              </p>
              <p className="font-semibold text-xl text-red-600 mb-3">25.000đ</p>
              <button className="border border-solid duration-300 cursor-pointer hover:bg-yellow-700 hover:text-white border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2">
                Thêm vào giỏ
              </button>
            </div>
          </div>
          <div>
            <div className="overflow-hidden">
              <img
                src={detail_1}
                className="hover:scale-125 w-full h-72  duration-300"
              />
            </div>
            <div className="bg-[#F5F5F5]  p-4">
              <h3 className="font-semibold text-xl mb-1">San pham 1</h3>
              <p className="text-[#898989] text-base mb-2">
                Stylish cafe chair
              </p>
              <p className="font-semibold text-xl text-red-600 mb-3">25.000đ</p>
              <button className="border border-solid duration-300 cursor-pointer hover:bg-yellow-700 hover:text-white border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2">
                Thêm vào giỏ
              </button>
            </div>
          </div>
          <div>
            <div className="overflow-hidden">
              <img
                src={detail_1}
                className="hover:scale-125 w-full h-72  duration-300"
              />
            </div>
            <div className="bg-[#F5F5F5]  p-4">
              <h3 className="font-semibold text-xl mb-1">San pham 1</h3>
              <p className="text-[#898989] text-base mb-2">
                Stylish cafe chair
              </p>
              <p className="font-semibold text-xl text-red-600 mb-3">25.000đ</p>
              <button className="border border-solid duration-300 cursor-pointer hover:bg-yellow-700 hover:text-white border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default DetailPage;
