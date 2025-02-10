"use client";

import { register } from "@/helpers/Auth.helper";
import { ValidateRegisterForm } from "@/helpers/validateRegister";
import { IRegister, IRegisterErrors, IRTouched } from "@/interfaces";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const RegisterView = () => {
  // const navigate = useNavigate()

  const router = useRouter(); //** para redirigir a los usuarios. router.push("/") */

  const [errors, setErrors] = useState<IRegisterErrors>({});
  const [touched, setTouched] = useState<IRTouched>({});
  const [newUserData, setNewUserData] = useState<IRegister>({
    name: "",
    email: "",
    address: "",
    password: "",
    phone: "",
  });

  const handleinputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setNewUserData({
      ...newUserData,
      [name]: value,
    });
    setErrors(
      ValidateRegisterForm({
        ...newUserData,
        [name]: value,
      })
    );
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };
  const submitRegisterForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    
    
    

    const validationErrors = ValidateRegisterForm(newUserData);
    setErrors(validationErrors)
    
    if(Object.keys(validationErrors).length > 0) {
      Swal.fire("Please complete correctly the form")
      return;
    }
    

    await register(newUserData);
    Swal.fire("registro exitoso");
    router.push("/login");
  };
  ;
  

  return (
    <div className="grid justify-center items-center h-full sm:h-full border-solid border-red-500">
      <div>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 m-2">
          Register of New User
        </h2>
        <form onSubmit={submitRegisterForm}>
          <div className="justify-center">
            <label>
              <h1 className="px-2">Name:</h1>
              <input
                name="name"
                type="text"
                value={newUserData.name}
                onChange={handleinputs}
                onBlur={handleBlur}
                className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-blue-700 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 border m-2"
              />
            </label>
            {touched.name && errors.name && <p className="text-red-500 font-bold text-sm">{errors.name} </p>}
          </div>

        

          <div>
            <label>
            <h1 className="px-2">Username:</h1> 
              <input
                name="address"
                type="text"
                value={newUserData.address}
                onChange={handleinputs}
                onBlur={handleBlur}
                className=" block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-blue-700 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 border m-2"
              />
            </label>
            {touched.address && errors.address && <p className= "text-red-500 font-bold text-sm">{errors.address} </p>}
          </div>



          <div>
            <label>
            <h1 className="px-2">Phone:</h1>
              <input
                name="phone"
                type="phone"
                value={newUserData.phone}
                onChange={handleinputs}
                onBlur={handleBlur}
                
                className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-blue-700 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 border m-2"
              />
            </label>
            {touched.phone && errors.phone && <p className="text-red-500 font-bold text-sm">{errors.phone} </p>}
          </div>

          <div>
            <label>
            <h1 className="px-2">Email:</h1> 
              <input
                name="email"
                type="email"
                value={newUserData.email}
                onChange={handleinputs}
                onBlur={handleBlur}
                placeholder="a@mail.com"
                className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-blue-700 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 border m-2"
              />
            </label>
            {touched.email && errors.email && <p className="text-red-500 font-bold text-sm">{errors.email} </p>}
          </div>


          <div>
            <label>
            <h1 className="px-2">Password:</h1> 
              <input
                name="password"
                type="password"
                value={newUserData.password}
                onChange={handleinputs}
                onBlur={handleBlur}
                placeholder="*****"
                className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-blue-700 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 border m-2"
              />
            </label>
            {touched.password && errors.password && <p className="text-red-500 font-bold text-sm">{errors.password} </p>}
          </div>
          <button
            type="submit"
            disabled={!!errors.address}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Register
          </button>
        </form>
        <p className="grid grid-cols-2 justify-center items-center">
          ¿Ya estas registrado? {"=>"}
          <button className="m-5">
          <Link
            href="/login"
            className="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
            
            Login
          </Link>
            </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;

//sweetalert1 