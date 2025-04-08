/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { config } from "../../../api/axios";

const SelectionStatusOrder = ({ statusOrder, order }: any) => {
  const { Option } = Select;
  const [currentStatus, setCurrentStatus] = useState(statusOrder);

  const statusList = [
    { value: "pending", label: "Chờ xác nhận" },
    { value: "cancelled", label: "Đã hủy" },
    { value: "processing", label: "Đang xử lý" },
    { value: "shipped", label: "Đang giao hàng" },
    { value: "delivered", label: "Đã giao hàng" },
    { value: "successed", label: "Thành công" },
  ];

  const isDisableOption = (optionValue: string) => {
    const currentIndex = statusList.findIndex(
      (status) => status.value === currentStatus
    );
    const optionIndex = statusList.findIndex(
      (status) => status.value === optionValue
    );

    return optionIndex <= currentIndex || currentStatus === "cancelled";
  };

  const onHandleChangeOrderStatus = async (
    idOrder: number,
    newStatus: string
  ) => {
    try {
      await config.patch(`/orders/${idOrder}`, {
        statusOrder: newStatus,
      });
      setCurrentStatus(newStatus);
      toast.success("Cập nhật thành công");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật thất bại");
    }
  };

  return (
    <div>
      <Select
        style={{ width: 200 }}
        placeholder="Chọn trạng thái"
        onChange={(newStatus) => onHandleChangeOrderStatus(order.id, newStatus)}
        defaultValue={currentStatus}
      >
        {statusList.map((status: any) => (
          <Option
            key={status.value}
            value={status.value}
            disabled={isDisableOption(status.value)}
          >
            {status.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};
export default SelectionStatusOrder;
