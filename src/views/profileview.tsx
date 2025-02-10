"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

const ProfileView: React.FC = () => {
  const router = useRouter();
  const { userData, logout } = useAuth();
  useEffect(() => {
    if (!userData?.token) {
      router.push("/login");
    }
  }, [userData, router]);

  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    if (!userData) {
      router.push("/");
    }
  }, [userData, router]);

  if (!userData) {
    return null;
  }

  return (
    <div className="grid justify-center h-screen border-solid border-red-500">
      <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 m-2">
        Your Profile
      </h1>
      <h4 className="block rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-blue-700 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 border m-2 h-8 w-50">
        Your name user: {userData.user.address}
      </h4>
      <h4 className="block rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-blue-700 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 border m-2 h-8 w-50">
        Your phone number: {userData.user.phone}
      </h4>
      <h4 className="block rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-blue-700 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 border m-2 h-8 w-50">
        Your email: {userData.user.email}
      </h4>
  
      <h4 className="m-2">
        See your historial of
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          href={"/dashboard/orders"}
        >
          Orders
        </Link>
      </h4>
      <button
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 m-4"

        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileView;
