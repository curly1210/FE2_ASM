/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, InputNumber, Skeleton, TreeSelect } from "antd";
import useList from "../../../hooks/useList";
import { useNavigate, useParams } from "react-router-dom";
import useUpdate from "../../../hooks/useUpdate";
import useOne from "../../../hooks/useOne";
import toast from "react-hot-toast";
// import axios from "axios";

const ProductUpdate = () => {
  const { data: categories } = useList({ resource: "categories" });
  const { id } = useParams();
  const { data: product, isLoading } = useOne({
    resource: "products",
    id: Number(id),
  });
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const treeData = categories?.map((category: any) => ({
    title: category.name,
    value: category.id,
  }));

  const { mutate, isPending } = useUpdate({
    resource: "products",
    id: Number(id),
  });

  const onSubmit = async (formData: any) => {
    mutate(formData, {
      onSuccess: () => {
        toast.success("Sửa thành công");
        navigate("/admin/products");
      },
      onError: () => toast.error("Sửa thất bại"),
    });
    // console.log(formData);
  };

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h2 className="text-xl font-bold">Sửa sản phẩm</h2>
      </div>

      <Skeleton loading={isLoading} active avatar>
        <Form
          form={form}
          style={{ maxWidth: 600 }}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          onFinish={onSubmit}
          initialValues={{
            ...product,
            categoryID: Number(product?.categoryID),
          }}
        >
          <Form.Item
            rules={[
              { required: true, message: "Vui lòng nhập tên" },
              { min: 3, message: "Tên phải có ít nhất 3 ký tự" },
            ]}
            label="Tên sản phẩm"
            name="name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Vui lòng nhập giá!" },
              { pattern: /^[1-9]\d*$/, message: "Vui lòng nhập số dương!" },
            ]}
            label="Giá"
            name="price"
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Vui lòng nhập số lượng!" },
              { pattern: /^[1-9]\d*$/, message: "Vui lòng nhập số dương!" },
            ]}
            label="Số lượng"
            name="quantity"
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Chọn danh mục" }]}
            label="Danh mục"
            name="categoryID"
          >
            <TreeSelect treeData={treeData} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Nhập đúng định dạng url" }]}
            label="Hình ảnh"
            name="image"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            label="Mô tả"
            name="description"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              {isPending ? <span>Đang tải...</span> : <span>Sửa sản phẩm</span>}
            </Button>
          </Form.Item>
        </Form>
      </Skeleton>
    </div>
  );
};
export default ProductUpdate;
