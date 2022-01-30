import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../features/basket/basketSlice";

function Product({ id, title, description, price, category, image }) {
  const dispatch = useDispatch();

  const MAX_RATING = 5;
  const MIN_RATING = 1;

  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.5);

  const addToBasketNow = () => {
    const productItems = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
      rating,
    };

    dispatch(addToBasket(productItems));
  };

  return (
    <div className="relative flex flex-col bg-white m-5 p-10 z-30" key={id}>
      <p className="absolute top-2 right-2 italic text-gray-400 text-xs">
        {category}
      </p>

      <Image src={image} height={200} width={200} objectFit="contain" />

      <h4 className="my-5">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency="USD" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            className="w-12"
            src={"https://links.papareact.com/fdw"}
            alt=""
          />
          <p className="text-xs text-gray-500">FREE Next-day delivery</p>
        </div>
      )}

      <button onClick={addToBasketNow} className="button">
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
