"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { account } from "@/appWriteConfig";
import { useRouter } from "next/navigation";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      getUserOnLoad();
    }
    setLoading(false);
  }, []);

  const getUserOnLoad = async () => {
    setLoading(true);
    try {
      const accountDetails = await account.get();
      localStorage.setItem("loggedInUser", JSON.stringify(accountDetails));
      setUser(accountDetails);
      console.log(accountDetails, "Account details");
    } catch (err) {
      if (err.code === 401) {
        // (missing scope) error
        console.log("User does not have required scope (account)");
      } else {
        console.log("Error", err);
      }
    }
    setLoading(false);
  };

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();

    try {
      await account.createEmailPasswordSession(
        credentials.email,
        credentials.password
      );
      const accountDetails = await account.get();
      localStorage.setItem("loggedInUser", JSON.stringify(accountDetails));
      setUser(accountDetails);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // async function handleOauthLogin() {
  //   account.createOAuth2Session(
  //     "google",
  //     "http://localhost:3000",
  //     "http://localhost:3000/Login"
  //   );
  // }

  const handleUserLogOut = async () => {
    await account.deleteSession("current");
    localStorage.removeItem("loggedInUser");
    setUser(null);
    window.location.href = "/Login";
  };

  const handleUserRegister = async (e, credentials) => {
    e.preventDefault();

    if (credentials.password1 !== credentials.password2) {
      alert("Password Don't Match");
      return;
    }

    try {
      await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name
      );

      await account.createEmailPasswordSession(
        credentials.email,
        credentials.password1
      );
      const accountDetails = await account.get();
      localStorage.setItem("loggedInUser", JSON.stringify(accountDetails));
      setUser(accountDetails);
      router.push("/");
    } catch (err) {
      console.log(err, "Register error");
    }
  };

  const contextData = {
    user,
    loading,
    handleUserLogin,
    handleUserLogOut,
    handleUserRegister,
    // handleOauthLogin,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading ...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
