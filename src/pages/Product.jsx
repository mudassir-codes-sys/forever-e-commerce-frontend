import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import star from "../assets/frontend_assets/star_icon.png";
import stardull from "../assets/frontend_assets/star_dull_icon.png";
import RelatedProducts from "../components/RelatedProducts";

function Product() {
  const { productId } = useParams();
  const [size, setSize] = useState("");
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");

  const fetchProductData = () => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!productData) {
    return <div className="opacity-0"></div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity duration-500 opacity-100">
      <div className="flex flex-col sm:flex-row gap-10">
        {/* IMAGES SECTION */}
        <div className="flex flex-1 flex-col-reverse sm:flex-row gap-3">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18%] w-full gap-3">
            {productData.image.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setImage(img)}
                className={`w-[24%] sm:w-full cursor-pointer border ${
                  image === img ? "border-black" : "border-transparent"
                }`}
                alt=""
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="" />
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="flex-1 space-y-4">
          <h1 className="font-medium text-2xl">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={stardull} alt="" />
            <p className="pl-2 text-sm">(122)</p>
          </div>

          {/* Price */}
          <p className="text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          {/* Description */}
          <p className="text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((s, i) => (
                <button
                  onClick={() => setSize(s)}
                  key={i}
                  className={`border py-2 px-4 cursor-pointer bg-gray-100 ${
                    s === size ? "border-orange-500" : ""
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8  cursor-pointer py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original</p>
            <p>Cash on delivery available</p>
            <p>Easy return and exchange</p>
          </div>
        </div>
      </div>
      {/* review */}
      <div className="mt-20">
        <div className="flex  gap-2">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex  mt-4 flex-col gap-4 border px-6 py-6 text-sm text-gray">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            dolores porro architecto culpa debitis similique?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius,
            doloremque obcaecati. Officia.{" "}
          </p>
        </div>
      </div>
      {/* ---------related products----------- */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
}

export default Product;
