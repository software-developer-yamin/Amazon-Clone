import moment from "moment";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import Header from "../components/Header";
import Order from "../components/Order";
import db from "../firebase";

function Orders({ orders }) {
  const { data: session } = useSession();
  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please signIn to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, items, timestamp, images }) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                images={images}
                items={items}
                timestamp={timestamp}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default Orders;

export const getServerSideProps = async (ctx) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const session = getSession(ctx);

  if (!session) {
    return {
      props: {},
    };
  }

  const stripeOrders = await db
    .collection("users")
    .doc((await session).user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
};
