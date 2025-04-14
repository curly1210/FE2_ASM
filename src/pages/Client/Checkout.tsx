/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthen } from "../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { config } from "../../api/axios";
import axios from "axios";

const Checkout = () => {
  const { user } = useAuthen();
  const [carts, setCarts] = useState<any>({});
  const [total, setTotal] = useState(0);

  const { setQuantityItem } = useCart();

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

  const generateOrderCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomPart = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomPart += characters[randomIndex];
    }

    const timestampStr = Date.now().toString();
    let timestampDigits = "";
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * timestampStr.length);
      timestampDigits += timestampStr[randomIndex];
    }

    return `ORDER${randomPart}${timestampDigits}`;
  };

  const handleData = (values: any) => {
    const { id: idUser, sex, role, ...filterValue } = values;
    const newValue = {
      idUser,
      ...filterValue,
      total,
      statusOrder: "pending",
      // statusPayment: false,
      orderDate: new Date(Date.now()).toISOString().split("T")[0],
      idOrder: generateOrderCode(),
      items: carts?.items,
      totalPrice: carts.totalPrice,
    };

    return newValue;
  };

  const onSubmit = async (values: any) => {
    try {
      const newValues = handleData(values);

      if (values.paymentMethod === "VNPAY") {
        localStorage.setItem("order", JSON.stringify(newValues));
        const res = await axios.get(
          `http://localhost:3001/create_payment_url?amount=${carts.totalPrice}`
        );
        if (res.data && res.data.paymentUrl) {
          window.location.href = res.data.paymentUrl;
        }
        // console.log("cuong");
      }

      if (values.paymentMethod === "COD") {
        // console.log("cuong");
        console.log(newValues);
        await config.post(`/orders`, { ...newValues, statusPayment: false });
        await config.delete(`/carts/${carts?.id}`);
        setQuantityItem(0);

        navigate("/order-success", { replace: true });
      }

      // Code đúng
      // const { id: idUser, sex, role, ...filterValue } = values;
      // // console.log(values);

      // const newValue = { idUser, ...filterValue };
      // // console.log(newValue);
      // console.log(carts);
      // await config.post(`/orders`, {
      // ...newValue,
      // total,
      // statusOrder: "pending",
      // statusPayment: false,
      // orderDate: new Date(Date.now()).toISOString().split("T")[0],
      // idOrder: generateOrderCode(),
      // // orderDate: Date.now(),
      // items: carts?.items,
      // totalPrice: carts.totalPrice,
      // });

      // carts?.items.map(async (item: any) => {
      // await config.delete(`/carts/${carts?.id}`);
      // setQuantityItem(0);

      // navigate("/order-success", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const { data: cartsList, isLoading } = useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      const { data } = await config.get(`/carts?idUser=${user?.user?.id}`);
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
              <div>
                <input
                  type="radio"
                  value="COD"
                  {...register("paymentMethod", {
                    required: {
                      value: true,
                      message: "Chọn phương thức thanh toán",
                    },
                  })}
                  // defaultChecked
                />
                <span className="font-medium ml-2">
                  Thanh toán khi nhận hàng
                </span>
              </div>
              <div>
                <input
                  type="radio"
                  value="VNPAY"
                  {...register("paymentMethod", {
                    required: {
                      value: true,
                      message: "Chọn phương thức thanh toán",
                    },
                  })}
                  // defaultChecked
                />
                <span className="font-medium ml-2">
                  Thanh toán online qua VNPay
                </span>
              </div>
              {errors?.paymentMethod?.message && (
                <p className="text-red-400 mt-1">
                  {(errors?.paymentMethod as any).message}
                </p>
              )}
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
