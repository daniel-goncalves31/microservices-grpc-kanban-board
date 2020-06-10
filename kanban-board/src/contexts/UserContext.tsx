import { useApolloClient } from "@apollo/react-hooks";
import React, { useContext, useEffect, useState } from "react";
import { MeDocument, User } from "../graphql/generated";

interface Context {
  currentUser: User | null | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  isAuthenticated: boolean;
}

const UserContext = React.createContext<Context>({
  currentUser: null,
  setCurrentUser: () => {},
  isAuthenticated: false,
});

const useUserContext = () => useContext(UserContext);

const UserProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(null);

  const { query } = useApolloClient();

  const fetchUser = async () => {
    try {
      const res = await query({
        query: MeDocument,
      });
      const user = res.data.me;
      if (!user) {
        setCurrentUser(null);
      } else {
        setCurrentUser(user);
      }
    } catch (error) {
      console.error(error.message);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, isAuthenticated: !!currentUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { useUserContext, UserProvider };
