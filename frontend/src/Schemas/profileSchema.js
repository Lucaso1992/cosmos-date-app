import * as yup from 'yup';


export const profileSchema = yup.object().shape({
  height: yup
    .number()
    .min(2),
  zodiac_sign: yup
    .string()
    .required("Zodiac sign name is required"),
  location: yup
    .string()
    .required("Location is required"),
  location_born: yup
    .string(),
  gender: yup
    .string()
    .required("Gender is required"),
  date_born: yup
    .date()
    .required("Born date is required"),
  love_interest: yup
    .string()
    .required("Love interest is required"),
  description: yup
    .string()
})