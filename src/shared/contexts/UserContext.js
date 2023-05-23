import { createContext, useState, useEffect } from "react";
import { getCurrentUser, getUserDisplayName } from "../utils/firebase";
import LoadingPage from "../../pages/library/components/Loading.page.component";

export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
  });


  export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const value = { currentUser, setCurrentUser };
  
    const findUser = async () => {
      setLoading(true);
      const resp = await getCurrentUser();
      if (resp) {
        const userData = await getUserDisplayName(resp.uid);

      
        setCurrentUser(userData);
        setLoading(false)
        return
      }
setCurrentUser(null)
      setLoading(false);
    };
  
    useEffect(() => {
      findUser();
    }, []);
  
    if (loading) {
      return <LoadingPage />;
    }
  
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
  };
  