"use client";
import { useAuth } from "@/context/AuthContext";
import { createOrder } from "@/helpers/Orders.helper";
import { IProduct } from "@/interfaces";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CartView = () => {
  const { userData } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState<IProduct[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    !userData?.token ? router.push("/login") : null;
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (storedCart.length) {
      const totalCart = storedCart.reduce((acum:number, item: IProduct) => {
         return acum + item.price;
      },0);
      setTotal(totalCart);
      setCart(storedCart);
    }
  }, []);

  const handleRemoveProduct = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    const newTotal = updatedCart.reduce((acum, item) => acum + item.price, 0);

    setCart(updatedCart);
    setTotal(newTotal);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = async () => {
    if(!cart || cart.length === 0) {
      Swal.fire({
        title: "Cart empty!",
        text: "You must add products to the cart before completing the purchase.",
        icon: "warning",
      });
      return 
    }
    const idProducts = cart?.map((product) => product.id);
    if (userData?.token) {
      await createOrder(idProducts, userData?.token);
      Swal.fire("Buy complete successfully")
      setCart([]);
      setTotal(0);
      localStorage.setItem("cart", "[]");
    }
  };
  return (
    <div>
      
        <h1 className="text-center ">Products:</h1>
      <div className={`${
    cart.length >= 3 ? "grid grid-cols-2 gap-4" : "grid"
  } justify-center  border-solid items-center content-center`}
> {cart.length ? (
          cart?.map((item: IProduct) => {
            return (

              
              <div className="grid grid-cols-2 justify-center justify-items-center rounded-md bg-gray-200 m-1 hover:bg-gray-300 transition duration-200 ease-in-out gap-2" key={item.id}>
                
                

                <p>{item.name}</p>
                
                <p>${item.price}</p>
                <img width={100} height={100}
                src={item.image} alt={item.name} className="w-24 h-24 object-contain px-2"  />

                <div className="content-center">
                <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                onClick={() => handleRemoveProduct(item.id)}
                >
                x
              </button>
                </div>
              </div>
              
            );
          })
        ) : (
          <div>Your cart is empty</div>
        )}
        
      </div>
      
      <div className="flex gap-4 items-center flex-col">
        Total: ${total}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
export default CartView;
