"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { userData } = useAuth(); //para leer la informacion del usuario
  return (
    <div>
      {/* <!-- component --> */}
      <nav className="bg-gray-200 shadow shadow-gray-300 px-2 md:px-auto">
        <div className="md:h-16 h-28 sm:h-8 mx-auto md:px-2 container flex items-center justify-between flex-wrap md:">
          {/* <!-- Logo --> */}
          <div className="text-blue-500 md:order-1">
            {/* <!-- Heroicon - Chip Outline --> */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </div>
          <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
            <ul className="flex font-semibold justify-between">
              {/* <!-- Active Link = text-indigo-500
                Inactive Link = hover:text-indigo-500 --> */}

              <li className="md:px-4 md:py-2 sm:px-2 sm:py-2 text-blue-500 hover:underline hover:underline-offset-4">
                <Link className="sm:p-2" href="/">Home</Link>
              </li>
              {userData?.token && (
                <li className="md:px-4 md:py-2 text-blue-500 hover:underline hover:underline-offset-4">
                  <Link href="/dashboard">Dashboard</Link>
                </li>
              )}

              
            
            </ul>
          </div>
          {userData && userData?.token ? (
            <div className="order-3 md:order-3">
              <Link href="/cart">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-gray-50 rounded-xl flex items-center gap-2">
                  {/* <!-- Heroicons - Login Solid --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span>Cart</span>
                </button>
              </Link>
            </div>
          ) : (
            <div className="order-2 md:order-3">
              <Link href="/login">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-gray-50 rounded-xl flex items-center gap-2">
                  {/* <!-- Heroicons - Login Solid --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span>Login</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
// NAVBAR GENERAL
// <div>
//     <Link href="/">Ir al home</Link>
//     <hr /><hr />
//     <Link href="/dashboard">Ir Link dashboard</Link>
// </div>

export default Navbar;
