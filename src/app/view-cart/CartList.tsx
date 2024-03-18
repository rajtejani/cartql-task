"use client";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useQuery } from "@urql/next";
import { GET_CART_DETAILS } from "./query";

const CartDetails = () => {
  const [cartId, setCartId] = useState<string | null>(null);

  const [{ data, fetching, error }] = useQuery({
    query: GET_CART_DETAILS,
    variables: { cartId },
    pause: !cartId,
  });

  useEffect(() => {
    const cartIdInLocalStorage = localStorage.getItem("cartId");

    if (!cartIdInLocalStorage) {
      redirect("/");
    } else {
      setCartId(cartIdInLocalStorage);
    }
  }, []);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="space-y-4 max-w-[800px] mx-auto py-10">
      <Card className="p-3">
        <p>
          Total Items: <b>{data?.cart?.totalItems}</b>
        </p>
        <p>
          Total Price: <b>{data?.cart?.grandTotal?.formatted}</b>
        </p>
      </Card>
      <Card className="p-3">
        <p>Items:</p>
        <ul className="list-decimal pl-[30px]">
          {data?.cart?.items.map((item: any) => (
            <li key={item.id}>
              <p>
                {item.name} - Quantity: {item?.quantity} - Price:{" "}
                {item?.lineTotal?.formatted}
              </p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default CartDetails;
