import { ApolloError } from "apollo-client";
import { toast } from "react-toastify";

const handleErrors = (error: ApolloError) => {
  if (!error) {
    return;
  }

  console.log(error.message);
  toast.error(error.message);
};

export default handleErrors;
