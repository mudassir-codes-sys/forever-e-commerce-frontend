import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

function Orders() {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(
        backendUrl + "/api/order/userOrders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        // Flatten orders & add order-level info to each item
        const allOrderItems = response.data.orders.flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            status: order.status,
            payment: order.payment,
            address: order.address,
            paymentMethod: order.paymentMethod,
            date: order.date,
            orderId: order._id, // optional, useful for tracking
          }))
        );

        setOrderData(allOrderItems.reverse());
        console.log("All order items:", allOrderItems);
      }
    } catch (error) {
      console.log(
        "Error loading orders:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  if (!orderData.length) {
    return (
      <div className="pt-16 text-center text-gray-500">
        <Title text1="MY" text2="ORDERS" />
        <p className="mt-6">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-16 px-4 md:px-16">
      <div className="text-2xl mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {orderData.map((item, index) => (
        <div
          key={index}
          className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="flex items-start gap-6 text-sm md:text-base">
            <img src={item.image[0]} className="w-16 sm:w-20" alt={item.name} />
            <div>
              <p className="font-medium">{item.name}</p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-700">
                <p>
                  {currency} {item.price}
                </p>
                <p>Quantity: {item.quantity}</p>
                <p>Size: {item.size}</p>
              </div>
              <p className="mt-1 text-gray-500 text-sm">
                Ordered on: {new Date(item.date).toLocaleDateString()}
              </p>
              <p className="mt-1 text-gray-500 text-sm">
                Payment: {item.paymentMethod} ({item.payment})
              </p>
              <p className="mt-1 text-gray-500 text-sm">
                Address: {item.address.street}, {item.address.city},{" "}
                {item.address.state}, {item.address.zipcode},{" "}
                {item.address.country}
              </p>
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col md:flex-row justify-between items-start md:items-center mt-4 md:mt-0 gap-4">
            <div className="flex items-center gap-2">
              <p
                className={`min-w-2 h-2 rounded-full ${
                  item.status === "Delivered"
                    ? "bg-green-500"
                    : item.status === "Shipped"
                    ? "bg-yellow-400"
                    : "bg-gray-400"
                }`}
              ></p>
              <p className="text-sm md:text-base">{item.status}</p>
            </div>
            <button className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer">
              Track Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
