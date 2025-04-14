import { Link } from "react-router-dom";

const EmptyCartPage = () => {
  return (
    <div>
      <section className="container max-w-7xl m-auto my-16 flex flex-col justify-between items-center gap-10">
        <h1 className="text-4xl font-semibold">Giỏ hàng trống</h1>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-yrKy00koNPRSg-MAE5rkMmy2HiIAE4U_HQ&s"
          alt=""
          width={200}
        />
        <Link to={"/"}>
          <button className="bg-yellow-600 text-white py-2 px-5 rounded-3xl font-semibold cursor-pointer">
            Tiếp tục mua sắm
          </button>
        </Link>
      </section>
    </div>
  );
};
export default EmptyCartPage;
