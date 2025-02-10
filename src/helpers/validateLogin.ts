import { ILoginErrors, ILoginProps } from "@/interfaces"

export function ValidateLoginForm(values: ILoginProps) {
    const errors : ILoginErrors = {};

        if(values.email && !/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email not valid"
        }

        if(!values.email) {
            errors.email = "Email required"
        }

        if (values.password.length < 4) {
            errors.password = "Password Minimum of 4 digits";
        }

        
    return errors
}
