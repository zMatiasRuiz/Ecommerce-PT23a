"use client";
import { useAuth } from "@/context/AuthContext";
import { IProduct } from "@/interfaces";
import React from "react";
import Swal from "sweetalert2";

const ProductDetail: React.FC<IProduct> = ({
  name,
  image,
  description,
  stock,
  price,
  id,
  categoryId,
}) => {
  const { userData } = useAuth();
  const handleAddToCart = () => {
    if (!userData?.token) {
      Swal.fire("You have to login to add product to your cart");
    } else {
      const cart: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const ProductExist = cart.some((item: IProduct) => {
        if (item.id === id) return true;
        return false;
      });

      if (ProductExist) {
        Swal.fire("This product is already in your cart.");
      } else {
        cart.push({
          name,
          image,
          id,
          description,
          stock,
          price,
          categoryId,
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        Swal.fire("You have added this product to your cart");
      }
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <h2>{name}</h2>
      <div className=" md:grid md:grid-cols-2 md:h-full md:justify-center justify-items-center">
        <img
          src={image}
          alt={`${name} - imagen del producto`}
          width={400}
          height={400}
          className="object-contain px-2 m-2"
        />
        <div className="grid justify-center text-center">
          <p className="block rounded-md bg-gray-200 px-3 py-1.5">{description}</p>
          <p className="content-center">Stock: {stock}</p>
          <p className="content-center">Price: ${price}</p>
          <div className="content-center">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
