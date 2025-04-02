import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div>
      <section className="container max-w-7xl m-auto my-16 flex flex-col justify-between items-center gap-10">
        <h1 className="text-4xl font-semibold">Đặt hàng thành công</h1>
        <img
          src="https://cdn-icons-png.flaticon.com/512/5610/5610944.png"
          alt=""
          width={200}
        />
        <Link to={"/"}>
          <button className="bg-yellow-600 text-white py-2 px-5 rounded-3xl font-semibold">
            Tiếp tục mua sắm
          </button>
        </Link>
      </section>
    </div>
  );
};
export default OrderSuccess;
