import { useAuth } from "@/utils/AuthContext";
import { CiLogout } from "react-icons/ci";

export default function Header() {
  const { user, handleUserLogOut } = useAuth();
  const handleUserLogIn = () => {
    window.location.href = "/Login";
  };
  return (
    <div id="header--wrapper">
      {user ? (
        <>
          Welcome {user.name}
          <CiLogout onClick={handleUserLogOut} className="header--link" />
        </>
      ) : (
        <button onClick={handleUserLogIn}>Login</button>
      )}
    </div>
  );
}
