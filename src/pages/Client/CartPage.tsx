/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useAuthen } from "../../Context/AuthContext";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../api/axios";
import EmptyCartPage from "./EmptyCartPage";

const CartPage = () => {
  const { user } = useAuthen();
  const [total, setTotal] = useState(0);
  const [carts, setCarts] = useState<any>({});

  const formatCurrency = (amount: number) => {
    return amount?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const { data: cartList, isLoading } = useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      const { data } = await config.get(`/carts?idUser=${user?.user?.id}`);
      setCarts(data[0]);
      return data;
    },
  });

  useEffect(() => {
    setTotal(carts?.totalPrice);
  }, [carts]);

  if (isLoading) return <div>Loading...</div>;

  if (!cartList) return <div>Không tìm thấy sản phẩm</div>;

  if (cartList.length === 0) return <EmptyCartPage />;
  // console.log(carts);

  return (
    <div>
      <section className="container max-w-7xl m-auto my-16 ">
        <h2 className="font-semibold text-black text-3xl text-center mb-5">
          Giỏ hàng
        </h2>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <table className="w-full ">
              <thead className="bg-neutral-100">
                <tr className="*:py-4 *:font-medium">
                  <th className="text-left pl-4">Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Sản phẩm</th>
                  <th>Thành tiền</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {carts?.items?.map((cartItem: any) => {
                  // console.log(cartItem);
                  return (
                    <CartItem
                      carts={carts}
                      setCarts={setCarts}
                      key={cartItem.ProductID}
                      cartItem={cartItem}
                      formatCurrency={formatCurrency}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-span-4 bg-neutral-100 p-8 self-start">
            <h2 className="font-semibold text-2xl mb-4">Thông tin giỏ hàng</h2>
            <hr className="border-[#A3A3A3] mb-5" />
            <p className="font-medium flex justify-between items-center mb-4">
              <span>Tạm tính</span>
              <span className="text-[#A3A3A3]">{formatCurrency(total)}</span>
            </p>
            <p className="font-medium flex justify-between items-center mb-4">
              <span>Tổng tiền</span>
              <span className="font-bold text-red-500 text-[20px] ">
                {formatCurrency(total)}
              </span>
            </p>
            <Link
              to={"/checkout"}
              className="border border-solid border-yellow-500 text-yellow-500 inline-block w-full text-center py-2 hover:bg-yellow-600 duration-200 font-semibold hover:text-white"
            >
              Thanh toán
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CartPage;
