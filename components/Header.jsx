import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector((state) => state.basket.items);

  return (
    <header>
      <div className="flex items-center bg-amazon_blue pt-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src={"https://links.papareact.com/f90"}
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        <div className="bg-yellow-400 hover:bg-yellow-500 h-10 hidden sm:flex items-center rounded-md flex-grow ">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
          />
          <SearchIcon className="h-12 p-4 cursor-pointer" />
        </div>
        <div className="flex items-center text-white text-sm space-x-6 mx-6 whitespace-nowrap">
          <div onClick={!session ? signIn : signOut} className="link">
            <p className="font-bold md:text-sm">
              {session ? `Hello ${session.user.name}` : "Sign In"}
            </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div className="link" onClick={() => router.push("/orders")}>
            <p className="font-bold md:text-sm">Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout/")}
            className="relative link flex items-center"
          >
            <span className="absolute top-0 right-0 md:right-10 h-5 w-4 bg-yellow-400 text-center rounded-full font-bold text-sm text-blue-900">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-12" />
            <p className="font-extrabold md:text-sm hidden md:inline mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center text-sm bg-amazon_blue-light text-white p-2 pl-6 space-x-4">
        <p className="flex items-center link">
          <MenuIcon className="h-6 mr-1" />
          <strong>All</strong>
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronic</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
