/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Popconfirm, Skeleton, Table } from "antd";
import useList from "../../../hooks/useList";
import useDelete from "../../../hooks/useDelete";
import { IProduct } from "../../../interface/type";
// import { IProduct } from "../../interface/type";

const UserListPage = () => {
  const { data, isLoading, error, isError } = useList({ resource: "users" });

  const { mutate } = useDelete({ resource: "users" });

  const dataSource = data?.map((product: IProduct) => ({
    key: product.id,
    ...product,
  }));

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (_: any, item: any) => {
        // console.log(params2);
        return (
          <div className="flex space-x-3">
            <Popconfirm
              title="Xóa sản phẩm"
              description="Bạn có chắc muốn xóa người dùng này không?"
              onConfirm={() => mutate(item.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  if (isLoading) return <Skeleton active />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>Không có sản phẩm nào</div>;

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h2 className="text-xl font-bold">Danh sách tài khoản</h2>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
export default UserListPage;
