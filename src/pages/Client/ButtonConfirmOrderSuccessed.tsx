/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { config } from "../../api/axios";

const ButtonConfirmOrderSuccessed = ({
  order,
  handleUpdateOrderStatus,
}: any) => {
  const onCancelOrder = async () => {
    try {
      if (confirm("Xác nhận nhận hàng thành công")) {
        config.patch(`/orders/${order.id}`, {
          statusOrder: "successed",
        });
        handleUpdateOrderStatus(order.id, "successed");
        toast.success("Xác nhận thành công");
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
      Xác nhận thành công
    </button>
  );
};
export default ButtonConfirmOrderSuccessed;
