/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Skeleton, Switch, Table } from "antd";
import useList from "../../../hooks/useList";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SelectionStatusOrder from "./selectionStatusOrder";
import { config } from "../../../api/axios";

const ListOrder = () => {
  const { data, isLoading, error, isError } = useList({ resource: "orders" });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const { data } = await config.patch(`/orders/${id}`, {
        statusPayment: true,
      });
      return data;
    },
    onSuccess: (_: any) => {
      toast.success("Cập nhật thành công");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  if (isLoading) return <Skeleton active />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>Không có đơn hàng nào</div>;

  const dataSource = data?.map((order: any) => ({
    key: order.id,
    ...order,
  }));

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
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
        return <SelectionStatusOrder statusOrder={statusOrder} order={order} />;
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
