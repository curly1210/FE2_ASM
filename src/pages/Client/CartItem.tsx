import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
const CartItem = ({ cartItem, formatCurrency }: any) => {
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
      <td>{cartItem?.quantity}</td>
      <td>{formatCurrency(cartItem?.quantity * product?.price)}</td>
      <td>
        <i className="fa-solid fa-trash text-red-500"></i>
      </td>
    </tr>
  );
};
export default CartItem;
