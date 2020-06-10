import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .matches(/(?=.*[A-Z])/, "Must contain at lest one capital letter")
    .matches(/(?=.*[0-9])/, "Must contain at least one number")
    .matches(/[a-zA-Z0-9]/, "Only alphanumeric characters")
    .min(8)
    .required(),
});
