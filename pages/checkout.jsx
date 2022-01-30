import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Currency from "react-currency-formatter";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
const stripePromise = loadStripe(
  "pk_test_51KNZ7qFDEvw3JKsT575Q9Mo3y9g0uJ8swusYnz729eEMfuS3EbeIzBTxKSr4tw4KDrvS6x8hQeLopjjlEao7hcvF00rbWLKyjR"
);

function Checkout() {
  const items = useSelector((state) => state.basket.items);
  const { data: session } = useSession();

  const total = useSelector((state) =>
    state.basket.items.reduce((acc, item) => acc + item.price, 0)
  );

  const createCheckoutSessions = async () => {
    const stripe = await stripePromise;

    const checkoutSessions = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSessions.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
    console.log("createCheckoutSessions");
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <title>YAMIN</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="lg:flex mx-auto max-w-screen-2xl">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src={"https://links.papareact.com/ikj"}
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Shopping Basket Is Not Empty"
                : "Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                description={item.description}
                rating={item.rating}
                category={item.category}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items) :
                <span className="font-bold ml-1">
                  <Currency quantity={total} currency={"USD"} />
                </span>
              </h2>

              <button
                onClick={createCheckoutSessions}
                className={`button mt-3 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
                disabled={!session}
              >
                {!session ? "Sign In to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
