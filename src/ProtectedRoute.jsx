import { useContext } from "react";
import { ShopContext } from "./context/ShopContext";

function ProtectedRoute({ children }) {
  const { token, navigate } = useContext(ShopContext);
  if (!token) return navigate("/login");
  return children;
}

export default ProtectedRoute;
