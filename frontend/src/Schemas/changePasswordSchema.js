import * as yup from 'yup';

// const passwordRules = /^(?=.*\d).{4,}$/;
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;

export const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(4)
    .matches(passwordRules, {message: "Password with min. 1 number, capital character."})
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required("Confirm Password is required")
})