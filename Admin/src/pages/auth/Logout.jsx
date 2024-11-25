import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/authSlice";

export function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/auth/sign-in");
  };

  handleLogout();
  return null;
}

export default Logout;
