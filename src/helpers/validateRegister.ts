import { IRegister, IRegisterErrors } from "@/interfaces";


export function ValidateRegisterForm(values: IRegister) {
  const errors: IRegisterErrors = {};
  if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "The email is not valid";
  }
  if (!values.name?.trim()) {
    errors.name = "Name required";
  } else if (values.name.trim().length < 3) {
    errors.name = "Name minimum of 3 characters";
  } 
  if (/^\s*$/.test(values.name)) {
    errors.name = "Your name is not valid ";
  }
  if (!values.email) {
    errors.email = "Email required";
  }
  if (!values.address) {
    errors.address = "Username required";
  }
  if (!values.address?.trim()) {
    errors.address = "Nombre de usuario requerido";
  } else if (values.address.trim().length < 4) {
    errors.address = "The name minimum is 3 characters";
  }
  if (!values.password) {
    errors.password = "Contraseña requerida";
  } else if (values.password.length < 4) {
    errors.password = "The password must be more than 4 characters.";
  }
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  
  if (/^\s*$/.test(values.address)) {
    errors.address = "Your username is not valid";
  }

  if (specialCharRegex.test(values.address)) {
    errors.address =
      "Username cannot contain special characters";
  }
  if (!values.password?.trim()) {
    errors.password = "Password not valid";
  }

  if (values.phone.length < 9 || values.phone.length > 10) {
    errors.phone = "Introduce a phone number valid";
  }
  if(!values.phone){
    errors.phone = "Phone number required"
  }
  if (/^(\d)\1+$/.test(values.phone)) {
    errors.phone = "The number cannot have all the same digits.";
  }
  return errors;
}
