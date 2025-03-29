import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useAuthen } from "../../Context/AuthContext";

/* eslint-disable @typescript-eslint/no-explicit-any */
const CartItem = ({ cartItem, formatCurrency, carts, setCarts }: any) => {
  const [quantity, setQuantity] = useState(cartItem.quantity | 0);
  const { user } = useAuthen();

  const fetchProductById = async (idProduct: number) => {
    const { data } = await axios.get(
      `http://localhost:3000/products/${idProduct}`
    );
    return data;
  };

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", cartItem.idProduct],
    queryFn: () => fetchProductById(cartItem.idProduct),
  });

  const updateCartItem = async (idCart: number, quantity: number) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3000/carts/${idCart}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`, // Thêm token vào header
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleQuantity = async (newQuantity: any) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    console.log(newQuantity);
    const data = updateCartItem(cartItem.id, newQuantity);
    if (!data) return;
    setCarts(
      carts.map((item: any) => {
        if (item.id !== cartItem.id) {
          return item;
        }
        return { ...item, quantity: newQuantity };
      })
    );
    // queryClient.invalidateQueries({
    //   queryKey: ["carts"],
    // });
  };

  if (isLoading)
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );

  if (!product)
    return (
      <tr>
        <td>Không tìm thấy sản phẩm</td>
      </tr>
    );

  // console.log(cartItem);
  return (
    <tr className="*:py-4 *:text-center font-medium">
      <td className="!text-left">
        <img src={product?.image} className="inline mr-4 w-20" alt="" />
        <span className="font-medium  text-[#A3A3A3]">{product?.name}</span>
      </td>
      <td className="text-[#A3A3A3]"> {formatCurrency(product?.price)}</td>
      <td>
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => onHandleQuantity(quantity - 1)}
            className="px-4 h-6 border border-solid cursor-pointer border-gray-300 bg-gray-200 rounded-xl flex items-center justify-center"
          >
            -
          </button>
          <p className="text-center"> {quantity} </p>
          <button
            onClick={() => onHandleQuantity(quantity + 1)}
            className="px-4 h-6 border border-solid cursor-pointer border-gray-300 bg-gray-200 rounded-xl flex items-center justify-center"
          >
            +
          </button>
        </div>
        {/* <div className="flex justify-center items-center">
          <button className="px-3 flex items-center justify-center border border-solid  bg-red-500">
            -
          </button>
          <p>{cartItem?.quantity}</p>
          <button>+</button>
        </div> */}
      </td>
      <td>{formatCurrency(quantity * product?.price)}</td>
      <td>
        <i className="fa-solid fa-trash text-red-500"></i>
      </td>
    </tr>
  );
};
export default CartItem;
