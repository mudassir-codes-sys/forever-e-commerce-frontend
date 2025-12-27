import stripe from "../assets/frontend_assets/stripe_logo.png";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "sonner";
import axios from "axios";
function PlaceOrder() {
  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    navigate,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (getCartAmount() === 0) {
      toast.error("Cart is empty");
      return;
    }
    setLoading(true);
    try {
      const items = cartItems.flatMap((item) => {
        return item.sizes.map((s) => {
          return {
            productId: item.productId,
            quantity: s.quantity,
            size: s.size,
          };
        });
      });

      let orderData = {
        items,
        deliveryCharges: delivery_fee,
        address: formData,
        paymentMethod: method,
      };

      const response = await axios.post(
        backendUrl + "/api/order/place",
        orderData,
        { headers: { token } }
      );
      if (method === "cod") {
        if (response.data.success) {
          setCartItems([]);
          toast.success("Order Placed");
          navigate("/orders");
        } else {
          toast.error(response.data.message);
        }
      } else {
        if (response.data.url) {
          window.location.href = response.data.url;
        } else {
          toast.error("Stripe session URL not found");
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]  border-t "
    >
      {/* -------Left side -------------- */}

      <div className="flex flex-col gap-4 w-full sm:max-w-[480px] ">
        <div className="text-xl my-3 sm:text-col">
          <Title text1="Delivery" text2="Information" />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>
        <input
          type="text"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          placeholder="Email Address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
        />
        <input
          type="text"
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            placeholder="zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            type="text"
            placeholder="Country"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>
        <input
          type="number"
          placeholder="Phone"
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
        />
      </div>

      {/* --------------right------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-3 flex-col lg:flex-row ">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center  gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={stripe} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center  gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              disabled={loading}
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm cursor-pointer"
            >
              {" "}
              PLACE ORDER{" "}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
