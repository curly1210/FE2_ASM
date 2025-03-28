/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Select, Skeleton, Switch, Table } from "antd";
import useList from "../../../hooks/useList";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ListOrder = () => {
  const { data, isLoading, error, isError } = useList({ resource: "orders" });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const { data } = await axios.patch(`http://localhost:3000/orders/${id}`, {
        statusPayment: true,
      });
      return data;
    },
    onSuccess: (_: any, { id }) => {
      toast.success("Cập nhật thành công");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const { Option } = Select;

  const onHandleChangeOrderStatus = async (
    idOrder: number,
    newStatus: string
  ) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${idOrder}`, {
        statusOrder: newStatus,
      });
      toast.success("Cập nhật thành công");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật thất bại");
    }
  };

  if (isLoading) return <Skeleton active />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>Không có đơn hàng nào</div>;

  const dataSource = data?.map((order: any) => ({
    key: order.id,
    ...order,
  }));

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "statusOrder",
      key: "statusOrder",
      render: (statusOrder: any, order: any) => {
        return (
          <Select
            style={{ width: 200 }}
            placeholder="Chọn trạng thái"
            onChange={(newStatus) =>
              onHandleChangeOrderStatus(order.id, newStatus)
            }
            defaultValue={statusOrder}
          >
            <Option value="pending">Chờ xác nhận</Option>
            <Option value="cancelled">Đã hủy</Option>
            <Option value="processing">Đang xử lý</Option>
            <Option value="shipped">Đang giao hàng</Option>
            <Option value="delivered">Đã giao hàng</Option>
          </Select>
        );
      },
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "statusPayment",
      key: "statusPayment",
      render: (statusPaymentRow: any, order: any) => {
        if (!statusPaymentRow) {
          return (
            <Switch
              disabled={statusPaymentRow}
              onChange={() => mutate({ id: order.id })}
            />
          );
        } else {
          return <Switch defaultChecked disabled />;
        }
      },
    },
    // defaultValue={statusPayment ? statusPayment : false}
    {
      title: "Hành động",
      dataIndex: "action",
      render: () => {
        // console.log(params2);
        return (
          <div className="flex space-x-3">
            {/* <Link to={`/admin/products/update/${item.id}`}> */}
            <Button type="primary">Chi tiết</Button>
            {/* </Link> */}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Danh sách đơn hàng</h2>

      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
export default ListOrder;
