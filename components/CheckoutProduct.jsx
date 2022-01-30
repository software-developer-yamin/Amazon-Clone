import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
} from "../features/basket/basketSlice";

function CheckoutProduct({
  title,
  description,
  price,
  image,
  rating,
  hasPrime,
  category,
  id,
}) {
  const dispatch = useDispatch();

  const addToBasketNow = () => {
    const productItems = {
      title,
      description,
      price,
      image,
      rating,
      hasPrime,
      category,
      id,
    };
    dispatch(addToBasket(productItems));
  };
  const removeFromBasketNow = () => {
    dispatch(removeFromBasket({ id }));
  };
  return (
    <div className="grid grid-cols-5 border-b-2 pb-5">
      <Image src={image} width={200} height={200} objectFit="contain" />

      <div className="col-span-3 mx-5">
        <p className="text-lg mb-1">{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="text-yellow-500 h-5" />
            ))}
        </div>
        <p className="text-sm line-clamp-3 my-2">{description}</p>

        <Currency quantity={price} currency={"USD"} />

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src={"https://links.papareact.com/fdw"}
              loading="lazy"
              className="w-12"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button onClick={addToBasketNow} className="button">
          Add to Basket
        </button>
        <button onClick={removeFromBasketNow} className="button">
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
