/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useAuthen } from "../../Context/AuthContext";
import ButtonCancelOrder from "./buttonCancelOrder";
import { useState } from "react";
import ButtonConfirmOrderSuccessed from "./ButtonConfirmOrderSuccessed";
import { config } from "../../api/axios";

const OrderPage = () => {
  const { user } = useAuthen();
  const [orders, setOrders] = useState<any[]>([]);

  const { isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await config.get(`/orders?idUser=${user?.user?.id}`);
      setOrders(data);
      return data;
    },
  });

  const handleUpdateOrderStatus = (orderID: number, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderID ? { ...order, statusOrder: newStatus } : order
      )
    );
  };

  const statusList = [
    { value: "pending", label: "Chờ xác nhận" },
    { value: "cancelled", label: "Đã hủy" },
    { value: "processing", label: "Đang xử lý" },
    { value: "shipped", label: "Đang giao hàng" },
    { value: "delivered", label: "Đã giao hàng" },
    { value: "successed", label: "Thành công" },
  ];

  const getStatusLabel = (value: string) => {
    const found = statusList.find((status) => status.value === value);
    return found ? found.label : "";
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="container max-w-7xl m-auto my-16 grid grid-cols-12 gap-10  items-start">
      <div
        className="col-span-4 flex flex-col gap-3 rounded-sm p-5 "
        style={{
          boxShadow: "0px 7px 29px 0px rgba(100, 100, 111, 0.2)",
        }}
      >
        <a href="#">Thông tin tài khoản</a>
        <a href="#">Danh sách đơn hàng</a>
      </div>

      <div
        className="col-span-8 p-5 rounded-sm"
        style={{
          boxShadow: "0px 7px 29px 0px rgba(100, 100, 111, 0.2)",
        }}
      >
        <h1 className="text-2xl font-medium mb-3">Danh sách đơn hàng</h1>
        <p className="text-gray-500 mb-4">Danh sách các đơn hàng đã đặt</p>

        {orders
          ?.slice()
          .reverse()
          .map((order: any) => {
            return (
              <div
                key={order.id}
                className="p-5 border border-gray-200 rounded-md mb-10"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-medium">Mã đơn hàng: {order?.id}</p>
                    <p className="text-gray-500 font-medium">
                      Ngày đặt hàng: {order.orderDate}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    {order?.statusOrder === "pending" && (
                      <ButtonCancelOrder
                        order={order}
                        handleUpdateOrderStatus={handleUpdateOrderStatus}
                      />
                    )}

                    {order?.statusOrder === "delivered" && (
                      <ButtonConfirmOrderSuccessed
                        order={order}
                        handleUpdateOrderStatus={handleUpdateOrderStatus}
                      />
                    )}

                    <a className="text-green-500" href="#">
                      Chi tiết
                    </a>
                  </div>
                </div>
                <hr className="text-gray-500 mb-10 " />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={order?.items[0].image}
                      alt=""
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <p className="font-medium">{order?.items[0].name}</p>
                  </div>
                  <p className="text-green-500 font-medium">
                    {getStatusLabel(order?.statusOrder)}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};
export default OrderPage;
