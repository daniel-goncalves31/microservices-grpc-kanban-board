import React from "react";
import { useUserContext } from "../../../contexts/UserContext";
import { useLogOutMutation } from "../../../graphql/generated";
import handleErrors from "../../../utils/handleApolloErrors";

interface Props {}

const Navbar: React.FC<Props> = () => {
  const [logOut] = useLogOutMutation();
  const { setCurrentUser } = useUserContext();

  const handleLogOut = async () => {
    try {
      const res = await logOut();
      if (res.data?.logOut) {
        setCurrentUser(null);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <nav className="px-4 py-2 flex justify-between item-center bg-indigo-500">
      <h1 className="text-2xl text-gray-100 font-semibold tracking-wide">
        Kanban Board
      </h1>
      <button
        type="button"
        className="px-4 py-1 rounded-sm border border-white text-white text-sm"
        onClick={handleLogOut}
      >
        Log Out
      </button>
    </nav>
  );
};

export default Navbar;
