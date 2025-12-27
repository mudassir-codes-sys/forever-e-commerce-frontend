import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function ProductItem({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);
  return (
    <Link
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className=" text-gray-700  cursor-pointer  "
      to={`/product/${id}`}
    >
      <div className="overflow-hidden">
        <img
          src={image[0]}
          className="hover:scale-110 transition ease-in-out"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency} {price}
      </p>
    </Link>
  );
}

export default ProductItem;
