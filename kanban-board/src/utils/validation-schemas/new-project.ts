import * as Yup from "yup";
import { Priority } from "../../graphql/generated";

export const newProjectValidationSchema = Yup.object().shape({
  name: Yup.string().min(6).max(100).required("The project name is required"),
  priority: Yup.mixed<Priority>().oneOf(Object.values(Priority)).required(),
});
