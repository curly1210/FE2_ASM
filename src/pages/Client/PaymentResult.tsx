/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { config } from "../../api/axios";
import { useCart } from "../../Context/CartContext";

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const [statusPayment, setStatusPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setQuantityItem } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/check_payment?${searchParams}`
        );
        if (data.data.vnp_ResponseCode === "00") {
          const values: any = JSON.parse(localStorage.getItem("order") ?? "{}");
          console.log(values.idUser);
          await config.post(`/orders`, { ...values, statusPayment: true });
          const { data: cart } = await config.get(
            `/carts?idUser=${values.idUser}`
          );
          await config.delete(`/carts/${cart[0].id}`);

          setStatusPayment(true);
          setQuantityItem(0);
        } else {
          setStatusPayment(false);
        }

        localStorage.removeItem("order");
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [searchParams]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <section className="container max-w-7xl m-auto my-16 flex flex-col justify-between items-center gap-10">
        {statusPayment && (
          <>
            <h1 className="text-4xl font-semibold">Đặt hàng thành công</h1>
            <img
              src="https://cdn-icons-png.flaticon.com/512/5610/5610944.png"
              alt=""
              width={200}
            />
            <div className="flex gap-5">
              <Link to={"/"}>
                <button className="bg-yellow-600 text-white py-2 px-5 rounded-3xl font-semibold cursor-pointer">
                  Tiếp tục mua sắm
                </button>
              </Link>
              <Link to={"/orders"}>
                <button className="bg-white border text-yellow-600 py-2 px-5 rounded-3xl font-semibold cursor-pointer">
                  Xem đơn hàng
                </button>
              </Link>
            </div>
          </>
        )}

        {!statusPayment && (
          <>
            <h1 className="text-4xl font-semibold">Đặt hàng thất bại</h1>
            <img
              src="https://cdn-icons-png.flaticon.com/512/399/399274.png"
              alt=""
              width={200}
            />
            <div className="flex gap-5">
              <Link to={"/"}>
                <button className="bg-yellow-600 text-white py-2 px-5 rounded-3xl font-semibold cursor-pointer">
                  Tiếp tục mua sắm
                </button>
              </Link>
              <Link to={"/orders"}>
                <button className="bg-white border text-yellow-600 py-2 px-5 rounded-3xl font-semibold cursor-pointer">
                  Xem đơn hàng
                </button>
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
};
export default PaymentResult;
