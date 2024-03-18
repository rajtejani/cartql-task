"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { generateRandomId } from "@/lib/randomId";
import { useMutation, useQuery } from "@urql/next";
import { ADD_ITEMS, CREATE_CART } from "../view-cart/query";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

export default function CartForm() {
  const [cartId, setCartId] = useState<string | null>(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let cartIdInLocalStorage = localStorage.getItem("cartId");

    if (!cartIdInLocalStorage) {
      cartIdInLocalStorage = generateRandomId(5);
    }
    setCartId(cartIdInLocalStorage);
  }, []);

  const [{ data, fetching, error }] = useQuery({
    query: CREATE_CART,
    variables: { cartId },
    pause: !cartId,
  });

  const [{ fetching: isAdding, data: addItemData }, callAddItemsMutation] =
    useMutation(ADD_ITEMS);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const itemId = generateRandomId(5);
    callAddItemsMutation({ cartId, ...values, id: itemId }).then((response) => {
      if (!response.error) {
        form.reset();
      }
    });
  }

  return (
    <Card className="max-w-[500px] mx-auto flex-1">
      <CardHeader>Add Items to Cart</CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g, iPhone 15 Pro Max" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product description.... "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="950.00"
                      type="number"
                      min={0}
                      onChange={({ target: { value } }) =>
                        field.onChange(Number(value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="5"
                      type="number"
                      min={0}
                      onChange={({ target: { value } }) =>
                        field.onChange(parseInt(value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add Item</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
