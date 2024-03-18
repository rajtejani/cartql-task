"use client";

import Image from "next/image";
import CartForm from "./create-cart/CartForm";
import { useEffect } from "react";
import { generateRandomId } from "@/lib/randomId";

export default function Home() {
  useEffect(() => {
    const cartIdInLocalStorage = localStorage.getItem("cartId");

    if (!cartIdInLocalStorage) {
      const uniqueId = generateRandomId();
      localStorage.setItem("cartId", uniqueId);
    }
  }, []);
  return (
    <main className="h-[100vh] w-full flex justify-center items-center">
      <CartForm />
    </main>
  );
}
