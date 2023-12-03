"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import CartItem from "../cart/components/cart-item";
import { redirect, useParams } from "next/navigation";
import CheckoutSummary from "./components/checkout-summary";
import toast from "react-hot-toast";
import CheckoutForm from "./components/checkout-form";

//TODO:
// 1. Work on ui of checkout page(does not seem nice to me)

export const revalidate = 0;

const CheckoutPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const items = useCart((state) => state.items);

  useEffect(() => {
    if (items.length === 0) {
      setIsMounted(false);
      toast.error("No items in cart, Redirecting to cart.");
      redirect("/cart");
    } else {
      setIsMounted(true);
    }
  }, [items.length]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Checkout</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-5">
              {items.length === 0 && (
                <p className="text-neutral-500">No items added to cart.</p>
              )}
              <ul>
                {items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
              <CheckoutSummary />
            </div>
            <CheckoutForm />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;
