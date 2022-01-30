import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";
import Header from "../components/Header";

function Success() {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col bg-white p-10">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you, your order has been confirmed
            </h1>
          </div>
          <p className="text-gray-500 italic mb-8">
            I’ve had loads of items show up with a thank you note, and some that
            request positive feedback. I’m not sure if Amazon frowns on this.
            I’m sure there’s no issue with saying thank you, but I would think
            carefully before asking for feedback, in case it causes trouble with
            Amazon.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="button font-bold text-md"
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
}

export default Success;
