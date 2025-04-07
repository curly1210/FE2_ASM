/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useModal } from "./ModalContext";
import { useAuthen } from "./AuthContext";
import useCreate from "../hooks/useCreate";
import toast from "react-hot-toast";

type CartProviderProps = {
  children: React.ReactNode;
};

type CartContextType = {
  onAddToCart: (idProduct: number, quantity: number) => void;
  formatCurrency: (amount: number) => string;
  quantityItem: number;
  setQuantityItem: (quantityItem: number) => void;
};

const CartContext = createContext<CartContextType>({
  onAddToCart: (idProduct: number, quantity: number) => {},
  formatCurrency: (amount: number) => amount.toLocaleString(),
  quantityItem: 0,
  setQuantityItem: () => {},
});

export const CartProvider = ({ children }: CartProviderProps) => {
  const { setIsOpen } = useModal();
  const [quantityItem, setQuantityItem] = useState(0);
  const { user } = useAuthen();

  useEffect(() => {
    const getCartItems = async () => {
      const { data: cartItems } = await axios.get(
        `http://localhost:3000/carts?idUser=${user?.user.id}`
      );

      if (cartItems.length !== 0) {
        setQuantityItem(cartItems[0].totalItem);
      }
    };

    if (user) {
      getCartItems();
    }
  }, [user]);

  const { mutate } = useCreate({ resource: "carts" });

  const onAddToCart = async (idProduct: number, quantity: number) => {
    if (!user) {
      setIsOpen(true);
    } else {
      let { data: cartItems } = await axios.get(
        `http://localhost:3000/carts?idUser=${user?.user.id}`
      );

      if (cartItems.length === 0) {
        const { data: product } = await axios.get(
          `http://localhost:3000/products/${idProduct}`
        );
        const { id: ProductID, name, price, image } = product;
        const filterProduct = {
          ProductID,
          name,
          quantity,
          price,
          image,
          subtotal: price * quantity,
        };
        const values = {
          idUser: user?.user?.id,
          items: [filterProduct],
          totalItem: 1,
          totalPrice: price * quantity,
        };
        mutate(values);
        setQuantityItem(quantityItem + 1);
        console.log("trống");
      } else {
        cartItems = cartItems[0];

        const existingItem = cartItems.items.find(
          (item: any) => item.ProductID === Number(idProduct)
        );

        if (existingItem) {
          // console.log(quantity);
          const updateItem = cartItems.items.map((item: any) =>
            item.ProductID === Number(idProduct)
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  subtotal: (item.quantity + quantity) * item.price,
                }
              : item
          );
          const totalPrice = updateItem?.reduce(
            (acc: any, item: any) => acc + item.subtotal,
            0
          );
          const value = { ...cartItems, items: updateItem, totalPrice };
          const { data } = await axios.patch(
            `http://localhost:3000/carts/${cartItems.id}`,
            value
          );
          console.log("Đã có ");
        } else {
          const { data: product } = await axios.get(
            `http://localhost:3000/products/${idProduct}`
          );
          const { id: ProductID, name, price, image } = product;
          const filterProduct = {
            ProductID,
            name,
            quantity,
            price,
            image,
            subtotal: price * quantity,
          };
          const updateItem = [...cartItems.items, filterProduct];
          const totalPrice = updateItem?.reduce(
            (acc: any, item: any) => acc + item.subtotal,
            0
          );
          const value = {
            ...cartItems,
            items: updateItem,
            totalPrice,
            totalItem: cartItems.totalItem + 1,
          };
          // console.log(updateItem);
          const { data } = await axios.patch(
            `http://localhost:3000/carts/${cartItems.id}`,
            value
          );

          setQuantityItem(quantityItem + 1);

          console.log("Chưa có");
        }
      }

      toast.success("Thêm vào giỏ hàng thành công ");
    }
  };

  const formatCurrency = (amount: number) => {
    return amount?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <CartContext.Provider
      value={{ onAddToCart, formatCurrency, quantityItem, setQuantityItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
