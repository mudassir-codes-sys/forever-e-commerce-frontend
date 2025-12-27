import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

function BestSeller() {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((p) => p.bestSeller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-sx sm:text-sm md:text-base text-gray-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi,
          veniam?
        </p>
        <div className="grid grid-cols-2 mt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 gap-y-6">
          {bestSeller.map((p, i) => (
            <ProductItem
              key={i}
              id={p.id}
              name={p.name}
              image={p.image}
              price={p.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestSeller;
