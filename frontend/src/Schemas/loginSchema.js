import * as yup from 'yup';


// const passwordRules = /^(?=.*\d).{4,}$/;
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {message: "Password with min. 1 number, capital character."})
    .required("Password is required")
})

export const singInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {message: "Password with min. 1 number, capital character."})
    .required("Password is required"),
  userName: yup
    .string()
    .min(2)
    .required("User name is required")
})

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
})

