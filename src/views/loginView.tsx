"use client";
import { useAuth } from "@/context/AuthContext";
import { login } from "@/helpers/Auth.helper";
import { ValidateLoginForm } from "@/helpers/validateLogin";
import { ILoginErrors, ILoginProps } from "@/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const LoginView = () => {
  const router = useRouter();
  const { setUserData } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false)

  const initialState = {
    email: "",
    password: "",
  };

  const [dataUser, SetDataUser] = useState<ILoginProps>(initialState);
  const [errors, setErrors] = useState<ILoginErrors>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true)

    const validationErrors = ValidateLoginForm(dataUser);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      Swal.fire("Please complete all the fields");
      return;
    }
    const response = await login(dataUser);

    if (response && response.token && response.user) {
      const { token, user } = response;
      setUserData({ token, user });
      Swal.fire("Login Successfully");
      router.push("/");
    } else {
      Swal.fire("User or Password not valid");
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    SetDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  useEffect(() => {
    if(isSubmitted){
      const errors = ValidateLoginForm(dataUser);
      setErrors(errors)
    }
  },[dataUser]);

  return (
    <div className="grid justify-center h-screen border-solid border-red-500">
      <fieldset className="border-solid border-red-500 ">
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 m-2">
          Login to Project Next
        </h1>
        <form onSubmit={handleSubmit} className="">
          <div>
            <label className="px-2">Email:</label>
            <input
              id="email-address"
              name="email"
              type="email"
              value={dataUser.email}
              placeholder="example@mail.com"
              onChange={handleChange}
              className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-blue-700 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 border m-2"
            />
            {errors.email && (
              <span className="text-red-500 font-bold text-sm">
                {errors.email}
              </span>
            )}
          </div>
          <div>
            <label className="px-2">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={dataUser.password}
              placeholder="****"
              onChange={handleChange}
              className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 m-2"
            />
            {errors.password && (
              <span className="text-red-500 font-bold text-sm">
                {errors.password}
              </span>
            )}
          </div>
          <button
            disabled={!!errors.email || !!errors.password}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2"
          >
            Log In
          </button>
        </form>

        <p className="m-5">
          ¿Are not registered?{" "}
          <button className="m-5">
            <Link
              href="/register"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Register
            </Link>
          </button>
        </p>
      </fieldset>
    </div>
  );
};

export default LoginView;
