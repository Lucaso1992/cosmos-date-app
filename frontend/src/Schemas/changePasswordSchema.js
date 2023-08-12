import * as yup from 'yup';

const passwordRules = /^(?=.*\d).{4,}$/;

export const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(4)
    .matches(passwordRules, {message: "Enter a password with min. 1 number"})
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required("Confirm Password is required")
})