import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { Toaster } from "sonner";
import ProtectedRoute from "./ProtectedRoute";
import VerifyPage from "./pages/VerifyPage";
import { fetchProducts } from "./Slices/ProductSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="px-4 sm:px-[5vw] md:[px-7vw] lg:px-[9vw]">
      <Toaster richColors position="top-center" />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              {" "}
              <Cart />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/place-order"
          element={
            <ProtectedRoute>
              <PlaceOrder />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/success" element={<VerifyPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
