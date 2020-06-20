import { useFormik } from "formik";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import AuthIcon from "../../assets/auth_icon.png";
import { useUserContext } from "../../contexts/UserContext";
import { useLoginMutation } from "../../graphql/generated";
import handleErrors from "../../utils/handleApolloErrors";
import { loginValidationSchema } from "../../utils/validation-schemas/login";
import Input from "../shared/Input";
interface Props {}

interface LoginCredentials {
  email: string;
  password: string;
}

const Login: React.FC<Props> = () => {
  const [login, { loading }] = useLoginMutation();
  const { setCurrentUser } = useUserContext();

  const onSubmit = async ({ email, password }: LoginCredentials) => {
    try {
      const { data } = await login({
        variables: { loginUserInput: { email, password } },
      });

      if (data && data.login) {
        setCurrentUser(data.login);
      }

      console.log(data);
    } catch (error) {
      handleErrors(error);
    }
  };

  const formik = useFormik<LoginCredentials>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: loginValidationSchema,
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
        <div className="mb-4 font-semibold text-3xl">
          <span className="text-purple-400">Welcome </span>
          <span>Back</span>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          error={formik.errors.email}
          touched={formik.touched.email}
          value={formik.values.email}
          disabled={loading}
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
          disabled={loading}
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
          } py-1 mt-8 w-3/5 flex items-center justify-center mx-auto rounded-lg block text-white font-bold`}
        >
          {loading ? <ClipLoader size={24} color="#FFF" /> : "Login"}
        </button>
      </form>
      <hr className="mt-4" />
      <Link to="/auth/signup" className="mt-4 block text-center text-sm">
        Don't have a account?
        <span className="font-medium text-indigo-600"> Sign Up</span>
      </Link>
    </motion.div>
  );
};

export default React.memo(Login);
