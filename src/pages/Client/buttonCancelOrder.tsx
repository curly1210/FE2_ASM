import toast from "react-hot-toast";
import { config } from "../../api/axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ButtonCancelOrder = ({ order, handleUpdateOrderStatus }: any) => {
  const onCancelOrder = async () => {
    try {
      if (confirm("Bạn có muốn hủy đơn hàng không?")) {
        config.patch(`/orders/${order.id}`, {
          statusOrder: "cancelled",
        });
        handleUpdateOrderStatus(order.id, "cancelled");
        toast.success("Hủy thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={() => onCancelOrder()}
      className={`px-2 py-1 text-red-400 border border-red-400 rounded-sm cursor-pointer`}
    >
      Hủy đơn hàng
    </button>
  );
};
export default ButtonCancelOrder;
