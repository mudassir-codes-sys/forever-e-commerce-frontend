import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
function GoogleLoginComponent() {
  const { backendUrl, setToken, navigate, getUserCart } =
    useContext(ShopContext);
  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const res = await axios.post(backendUrl + "/api/user/google/login", {
        token,
      });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        await getUserCart(res.data.token);
        navigate("/");
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  return (
    <GoogleLogin
      size="large"
      width={400}
      shape="square"
      onSuccess={handleSuccess}
      onError={(err) => console.log(err)}
    />
  );
}

export default GoogleLoginComponent;
