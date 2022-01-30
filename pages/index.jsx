import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/react";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>YAMIN</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    props: {
      products,session
    },
  };
};
