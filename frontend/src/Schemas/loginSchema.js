import * as yup from 'yup';


const passwordRules = /^(?=.*\d).{4,}$/;
// const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Required"),
  password: yup
    .string()
    .min(4)
    .matches(passwordRules, {message: "Please enter a valid password"})
    .required("Required"),
  userName: yup
    .string()
    .min(2)
    // .required("Required")
})