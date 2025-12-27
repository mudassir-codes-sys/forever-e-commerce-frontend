import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  // -----------------Fetch All Products-----------------------------
  const allProducts = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/product/list");
      setProducts(res.data.products);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const addToCart = async (productId, size, quantity = 1) => {
    if (token) {
      if (!size) return toast.error("Select Product Size");
      let prevCart = [...cartItems];
      let cartData = Array.isArray(cartItems) ? cartItems.slice() : [];
      const existingProduct = cartData.find(
        (product) => productId === product.productId
      );
      if (existingProduct) {
        const existingSize = existingProduct.sizes.find((s) => s.size === size);
        if (existingSize) {
          existingSize.quantity += quantity;
        } else {
          existingProduct.sizes.push({ size, quantity });
        }
      } else {
        cartData.push({ productId, sizes: [{ size, quantity }] });
      }
      toast.success("Product Added to cart");
      setCartItems(cartData);

      try {
        const res = await axios.post(
          backendUrl + "/api/cart/add",
          { productId, size, quantity },
          { headers: { token } }
        );
        if (!res.data.success) {
          setCartItems(prevCart);
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error?.response?.data?.message || error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const product of cartItems) {
      for (const s of product.sizes) {
        totalCount += s.quantity;
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemid, size, quantity) => {
    let cartData = cartItems.slice();
    const product = cartData.find((p) => p.productId === itemid);
    if (!product) return;
    const sizeObj = product.sizes.find((s) => s.size === size);
    if (!sizeObj) return;
    if (quantity === 0) {
      // Remove the size from product
      product.sizes = product.sizes.filter((s) => s.size !== size);

      // If product has no more sizes, remove the product from cart
      if (product.sizes.length === 0) {
        cartData = cartData.filter((c) => c.productId !== itemid);
      }
    } else {
      sizeObj.quantity = quantity;
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemid, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const getUserCart = async (token) => {
    if (!token) return null;
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        setCartItems(response.data.cart);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCartAmount = () => {
    if (!token) return null;
    let totalAmount = 0;
    cartItems.forEach((product) => {
      const productData = products.find((p) => p._id === product.productId);
      if (!productData) return;
      product.sizes.forEach((p) => {
        totalAmount += p.quantity * productData.price;
      });
    });
    return totalAmount;
  };

  useEffect(() => {
    allProducts();
  }, []);
  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  // useEffect(() => {}, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getUserCart,
    setCartItems,
    navigate,
    getCartCount,
    updateQuantity,
    getCartAmount,
    token,
    setToken,
    backendUrl,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
