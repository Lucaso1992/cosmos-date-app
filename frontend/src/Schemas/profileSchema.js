import * as yup from 'yup';


export const profileSchema = yup.object().shape({
  height: yup
    .number()
    .min(60),
  zodiac_sign: yup
    .string()
    .required("Zodiac sign name is required")
    .oneOf(["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"], "Invalid zodiac sign"),
  location: yup
    .string()
    .required("Location is required"),
  location_born: yup
    .string(),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["Male", "Female", "Other"], "Invalid gender"),
  date_born: yup
    .date()
    .required("Born date is required"),
  love_interest: yup
    .string()
    .required("Love interest is required")
    .oneOf(["Male", "Female", "Indifferent"], "Invalid love interest"),
  description: yup
    .string()
})