"use client";
import { useAuth } from "@/context/AuthContext";
import { getOrder } from "@/helpers/Orders.helper";
import { IOrder, IProduct } from "@/interfaces";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const OrdersView = () => {
  const router = useRouter();
  const { userData } = useAuth();

  const [orders, setOrders] = useState<IOrder[]>([]);
  const loadOrders = async () => {
    if (userData?.token) {
      const response : IOrder[] = await getOrder(userData?.token);
      
      
      setOrders(response);
    }
  };

  useEffect(() => {
    !userData?.token ? router.push("/") : loadOrders();
  }, []);


  return (
    <div  >
      

      <div className="grid justify-center ">

      {orders.length ? (
        orders?.map((item: IOrder) => {
          return (
            <div className="flex flex-col sm:grid grid-cols-4 m-5 rounded-md bg-gray-200 hover:bg-gray-300 transition duration-200 ease-in-out" key={item.id}>
              <p className="font-bold tracking-tight text-gray-900 m-2">Estado - {item.status.toLocaleUpperCase()}</p>
              <p className="m-2">Date {new Date(item.date)?.toLocaleString()}</p>
            

            
              <h3 className="m-2">Purchased products:</h3>
              
                {item.products?.length > 0 ?(
                  

                  <ul>
                {item.products.map((prod) => (
                  
                  
                  <li className="m-2" key={prod.id}>
                    {prod.name} - ${prod.price}
                    <img
                    width={100}
                    height={100}
                    src={prod.image} alt="" />
                  </li>
                  
                ))} 
              </ul>
            
              ) : (
                <p>No hay productos en esta orden.</p>
              )}
              </div>
            
          );
        })
        
      ) : (
        <div>Your cart is empty</div>
      )}
    </div>
      </div>
  );
};

export default OrdersView;
