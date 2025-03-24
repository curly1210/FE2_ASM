/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, InputNumber, TreeSelect } from "antd";
import useList from "../../../hooks/useList";
import useCreate from "../../../hooks/useCreate";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import axios from "axios";

const ProductAdd = () => {
  const { data } = useList({ resource: "categories" });
  const { mutate, isPending } = useCreate({ resource: "products" });
  // const [ contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const treeData = data?.map((category: any) => ({
    title: category.name,
    value: category.id,
  }));

  const onSubmit = async (formData: any) => {
    mutate(formData, {
      onSuccess: () => {
        toast.success("Thêm thành công");
        navigate("/admin/products");
      },
      onError: () => toast.error("Thêm thất bại"),
    });
    // console.log(formData);
  };

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h2 className="text-xl font-bold">Thêm sản phẩm</h2>
      </div>

      <Form
        form={form}
        style={{ maxWidth: 650 }}
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onFinish={onSubmit}
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
            {isPending ? <span>Đang tải...</span> : <span>Thêm sản phẩm</span>}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default ProductAdd;
