import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
