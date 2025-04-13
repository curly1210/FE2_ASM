/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useCart } from "../../../Context/CartContext";
import useList from "../../../hooks/useList";
// import ChartMoth from "./ChartMoth";
// import { Column } from "@ant-design/plots";
import ChartMonth from "./ChartMoth";
import ChartDay from "./ChartDay";

const Statistical = () => {
  const { formatCurrency } = useCart();
  const [quantityPending, setQuantityPending] = useState(0);
  const [quantityCancelled, setQuantityCancelled] = useState(0);
  const [quantityProcessing, setQuantityProcessing] = useState(0);
  const [quantityShipped, setQuantityShipped] = useState(0);
  const [quantityDelivered, setQuantityDelivered] = useState(0);
  const [quantitySuccessed, setQuantitySuccessed] = useState(0);
  const { data: orders, isLoading } = useList({ resource: "orders" });
  const { data: accounts } = useList({ resource: "users" });

  // const data = [
  //   { month: "Jan", revenue: 120000 },
  //   { month: "Feb", revenue: 85000 },
  //   { month: "Mar", revenue: 95000 },
  // ];

  // const config = {
  //   data,
  //   xField: "month",
  //   yField: "revenue",
  //   label: {
  //     position: "middle",
  //     style: {
  //       fill: "#FFFFFF",
  //       opacity: 0.6,
  //     },
  //   },
  //   meta: {
  //     month: { alias: "Tháng" },
  //     revenue: { alias: "Doanh thu (VND)" },
  //   },
  //   color: "#1677ff",
  // };

  useEffect(() => {
    if (!orders) return;

    let pending = 0,
      cancelled = 0,
      processing = 0,
      shipped = 0,
      delivered = 0,
      successed = 0;

    orders.forEach((order: any) => {
      switch (order.statusOrder) {
        case "pending":
          pending++;
          break;
        case "cancelled":
          cancelled++;
          break;
        case "processing":
          processing++;
          break;
        case "shipped":
          shipped++;
          break;
        case "delivered":
          delivered++;
          break;
        case "successed":
          successed++;
          break;
        default:
          break;
      }
    });

    setQuantityPending(pending);
    setQuantityCancelled(cancelled);
    setQuantityProcessing(processing);
    setQuantityShipped(shipped);
    setQuantityDelivered(delivered);
    setQuantitySuccessed(successed);
  }, [orders]);

  const totalPrice = orders?.reduce((acc: any, cur: any) => {
    return cur.statusPayment ? acc + cur.totalPrice : acc;
  }, 0);

  const users = accounts?.filter((account: any) => {
    if (account.role === "user") {
      return account;
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="bg-white mb-10">
        <div className="grid grid-cols-3 gap-5 mb-8">
          <div className="py-2 px-3 border-r border-b border-gray-200">
            <h1 className="mb-3.5 text-[18px] text-gray-500 font-medium">
              DOANH THU
            </h1>
            <div className="flex justify-between">
              <p className="font-semibold text-2xl">
                {formatCurrency(totalPrice)}
              </p>
              <div className="w-10 h-10 rounded  flex justify-center items-center bg-green-100">
                <div className="w-5 h-5  flex justify-center items-center border-green-500 border-2 rounded-full">
                  <i className="fa-solid fa-dollar-sign text-green-500 "></i>
                </div>
              </div>
            </div>
          </div>
          <div className="py-2 px-3 border-r border-b border-l border-gray-200">
            <h1 className="mb-3.5 text-[18px] text-gray-500 font-medium">
              KHÁCH HÀNG
            </h1>
            <div className="flex justify-between">
              <p className="font-semibold text-2xl">{users?.length}</p>
              <div className="w-10 h-10 rounded  flex justify-center items-center bg-orange-50">
                <div className="w-6 h-6  flex justify-center items-center border-orange-300 border-2 rounded-full">
                  <i className="fa-regular fa-user  text-orange-300 text-sm"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="py-2 px-3 border-r border-b border-l border-gray-200">
            <h1 className="mb-3.5 text-[18px] text-gray-500 font-medium">
              ĐƠN HÀNG
            </h1>
            <div className="flex justify-between">
              <p className="font-semibold text-2xl">{orders?.length}</p>
              <div className="w-10 h-10 rounded  flex justify-center items-center bg-gray-200">
                <div className="w-6 h-6  flex justify-center items-center border-gray-400 border-2 rounded-full">
                  <i className="fa-regular fa-pen-to-square text-gray-400 text-[13px]"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="px-3 text-[18px] font-semibold mb-6">
            Thống kê đơn hàng
          </h2>
          <div className="grid grid-cols-3 gap-3 border-b border-gray-300 mb-7">
            <div className="px-3 pb-6 border-r border-gray-300">
              <p className="text-[18px] font-medium text-gray-500 mb-1">
                Chờ xác nhận
              </p>
              <div className="flex gap-3 items-center">
                <i className="fa-regular text-2xl text-gray-400 fa-hourglass-half"></i>
                <p className="text-2xl">{quantityPending}</p>
              </div>
            </div>
            <div className="px-3 pb-6 border-r border-gray-300">
              <p className="text-[18px] font-medium text-gray-500 mb-1">
                Đang xử lý
              </p>
              <div className="flex gap-3 items-center">
                <i className="fa-regular fa-circle-check text-2xl text-gray-400"></i>
                <p className="text-2xl">{quantityProcessing}</p>
              </div>
            </div>
            <div className="px-3 pb-6 border-r border-gray-300">
              <p className="text-[18px] font-medium text-gray-500 mb-1">
                Đang giao hàng
              </p>
              <div className="flex gap-3 items-center">
                <i className="fa-solid fa-truck text-2xl text-gray-400"></i>
                <p className="text-2xl">{quantityShipped}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 border-b border-gray-300">
            <div className="px-3 pb-6 border-r border-gray-300">
              <p className="text-[18px] font-medium text-gray-500 mb-1">
                Đã giao hàng
              </p>
              <div className="flex gap-3 items-center">
                <i className="fa-solid fa-people-arrows text-2xl text-gray-400"></i>
                <p className="text-2xl">{quantityDelivered}</p>
              </div>
            </div>
            <div className="px-3 pb-6 border-r border-gray-300">
              <p className="text-[18px] font-medium text-gray-500 mb-1">
                Thành công
              </p>
              <div className="flex gap-3 items-center">
                <i className="fa-regular fa-thumbs-up text-2xl text-gray-400"></i>
                <p className="text-2xl">{quantitySuccessed}</p>
              </div>
            </div>
            <div className="px-3 pb-6 border-r border-gray-300">
              <p className="text-[18px] font-medium text-gray-500 mb-1">
                Đã hủy
              </p>
              <div className="flex gap-3 items-center">
                <i className="fa-regular fa-trash-can  text-2xl text-gray-400"></i>
                <p className="text-2xl">{quantityCancelled}</p>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>

      <div className="bg-white py-5 px-4">
        <div className="grid grid-cols-2 gap-10">
          <div>{<ChartMonth />}</div>
          <div>{<ChartDay />}</div>
        </div>
        {/* <div className="min-h-[400px]">{<Column {...config} />}</div> */}
      </div>
    </div>
  );
};
export default Statistical;
