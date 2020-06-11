import { useFormik } from "formik";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import AuthIcon from "../../assets/auth_icon.png";
import { useUserContext } from "../../contexts/UserContext";
import { useSignUpMutation } from "../../graphql/generated";
import { signUpValidationSchema } from "../../utils/validation-schemas/signUp";
import Input from "../shared/Input";

interface Props {}

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC<Props> = () => {
  const [signUp, { loading }] = useSignUpMutation();
  const { setCurrentUser } = useUserContext();

  const onSubmit = async ({ name, email, password }: SignUpCredentials) => {
    try {
      const { data } = await signUp({
        variables: { signUpUserInput: { name, email, password } },
      });

      if (data && data.signUp) {
        setCurrentUser(data.signUp);
      }

      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const formik = useFormik<SignUpCredentials>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit,
    validationSchema: signUpValidationSchema,
  });

  return (
    <motion.div
      className="w-4/6 p-4"
      initial={{ opacity: 0, x: "150%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center">
        <img src={AuthIcon} alt="icon" className="w-24 h-24" />
        <div className="mb-2 font-semibold text-3xl">
          <span className="text-purple-400">Nice To </span>
          <span>Meet You</span>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <Input
          label="Name"
          type="text"
          name="name"
          error={formik.errors.name}
          touched={formik.touched.name}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          error={formik.errors.email}
          touched={formik.touched.email}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          error={formik.errors.password}
          touched={formik.touched.password}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          error={formik.errors.confirmPassword}
          touched={formik.touched.confirmPassword}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button
          type="submit"
          disabled={!formik.isValid || loading}
          className={`${
            !formik.isValid || loading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500"
          } py-1 mt-4 w-3/5 block mx-auto rounded-lg block text-white font-bold`}
        >
          Sign Up
        </button>
      </form>
      <hr className="mt-4" />
      <Link to="/auth/login" className="mt-2 block text-center text-sm">
        Already have an account?
        <span className="font-medium text-indigo-600"> Log In</span>
      </Link>
    </motion.div>
  );
};

export default React.memo(SignUp);
