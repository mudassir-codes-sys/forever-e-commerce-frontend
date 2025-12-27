import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

function RelatedProducts({ category, subCategory, currentProductId }) {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let copy = products.slice();

      copy = copy.filter(
        (p) =>
          p.category === category &&
          p.subCategory === subCategory &&
          p._id !== currentProductId
      );

      setRelated(copy.slice(0, 5));
    }
  }, [products, category, subCategory, currentProductId]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-7">
        {related.map((p, i) => (
          <ProductItem
            key={i}
            id={p._id}
            name={p.name}
            price={p.price}
            image={p.image}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
