/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthen } from "../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate, replace, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user } = useAuthen();
  const [carts, setCarts] = useState<any>({});
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return amount?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (values: any) => {
    try {
      const { id: idUser, sex, role, ...filterValue } = values;
      // console.log(values);

      const newValue = { idUser, ...filterValue };
      // console.log(newValue);
      console.log(carts);
      const { data } = await axios.post(`http://localhost:3000/orders`, {
        ...newValue,
        total,
        statusOrder: "pending",
        statusPayment: false,
        orderDate: new Date(Date.now()).toISOString().split("T")[0],
        items: carts?.items,
        totalPrice: carts.totalPrice,
      });

      // carts?.items.map(async (item: any) => {
      await axios.delete(`http://localhost:3000/carts/${carts?.id}`);
      // });

      // // <Navigate to={"/order-success"} />;
      navigate("/order-success", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const { data: cartsList, isLoading } = useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3000/carts?idUser=${user?.user?.id}`
      );
      setCarts(data[0]);
      return data;
    },
  });

  useEffect(() => {
    // const { role, sex, ...check } = user?.user;
    reset(user?.user); // Reset form với dữ liệu mới
  }, [user?.user, reset]);

  useEffect(() => {
    setTotal(carts?.totalPrice);
  }, [carts]);

  if (isLoading) return <div>Loading...</div>;

  if (!cartsList) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div>
      <section className="container max-w-7xl m-auto my-16 ">
        <h1 className="font-semibold text-[40px] mt-16 mb-8">Thanh toán</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-8"
        >
          <div>
            <div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label htmlFor="fullname" className="font-medium">
                    Họ tên
                  </label>
                  <input
                    {...register("fullname", {
                      required: {
                        value: true,
                        message: "Vui lòng nhập họ tên",
                      },
                    })}
                    className="border border-solid border-neutral-300 block w-full outline-none p-2 mt-2"
                    type="text"
                  />
                  {errors?.fullname?.message && (
                    <p className="text-red-400 mt-1">
                      {(errors?.fullname as any).message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="font-medium">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Vui lòng nhập email",
                      },
                    })}
                    className="border border-solid border-neutral-300 block w-full outline-none p-2 mt-2"
                    type="text"
                  />
                  {errors?.email?.message && (
                    <p className="text-red-400 mt-1">
                      {(errors?.email as any).message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <label htmlFor="phone" className="font-medium">
                  Số điện thoại
                </label>
                <input
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Vui lòng nhập số điện thoại",
                    },
                  })}
                  className="border border-solid border-neutral-300 block w-full outline-none p-2 mt-2"
                  type="text"
                />
                {errors?.phone?.message && (
                  <p className="text-red-400 mt-1">
                    {(errors?.phone as any).message}
                  </p>
                )}
              </div>
              <div className="mt-2">
                <label htmlFor="address" className="font-medium">
                  Địa chỉ
                </label>
                <input
                  {...register("address", {
                    required: { value: true, message: "Vui lòng nhập địa chỉ" },
                  })}
                  className="border border-solid border-neutral-300 block w-full outline-none p-2 mt-2"
                  type="text"
                />
                {errors?.address?.message && (
                  <p className="text-red-400 mt-1">
                    {(errors?.address as any).message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <p className="*:font-semibold *:text-2xl flex justify-between">
              <span>Sản phẩm</span>
              <span>Tạm tính</span>
            </p>
            {carts?.items?.map((item: any) => (
              <div key={item.ProductID} className="flex justify-between mt-4">
                <p>
                  <span className="text-neutral-500 ">{item.name} </span>
                  <span className="font-medium">x{item.quantity}</span>
                </p>
                <span className="font-medium">
                  {formatCurrency(item.quantity * item.price)}
                </span>
              </div>
            ))}

            <p className="flex justify-between mt-4">
              <span>Tạm tính</span>
              <span className="font-medium">{formatCurrency(total)}</span>
            </p>
            <p className="flex justify-between mt-4">
              <span>Tổng tiền</span>
              <span className="font-bold text-xl text-[#B88E2F]">
                {formatCurrency(total)}
              </span>
            </p>
            <hr className="my-8 border-[#A3A3A3]" />
            <div>
              <input type="radio" defaultChecked />
              <span className="font-medium ml-2">Thanh toán khi nhận hàng</span>
            </div>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="border border-solid border-yellow-600 text-yellow-600 font-semibold py-2 px-24 hover:bg-yellow-600 hover:text-white duration-200 cursor-pointer"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};
export default Checkout;
