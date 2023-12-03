import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { usePaystackPayment } from "react-paystack";
import { v4 as uuidv4 } from "uuid";
import { PaystackProps } from "react-paystack/dist/types";
import axios from "axios";

//TODO:
// 1. Implement logic for form validation
// 2. Implement logic for delivery fee calculation (i hard-coded it in right now)
// 3. Work on generateTableString to show cart items in receipt properly
// 4. Fix typescript errors

type CheckoutFormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: string;
};

const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().min(2),
  phoneNumber: z.string().min(2),
  address: z.string().min(2),
});

const CheckoutForm = () => {
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  };

  const { items, removeAll } = useCart();
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const generateTableString = () => {
    // Header row
    let tableString = "Product\tSize\tPrice\n";

    // Rows for each item in the cart
    items.forEach((item) => {
      tableString += `\n${item.name}\t${item.size.name}\t${item.price}\n`;
    });

    return tableString;
  };

  const form = useForm<CheckoutFormData>({
    // resolver: zodResolver(formSchema),
    defaultValues,
  });

  const referenceID = uuidv4();
  const initialConfig: PaystackProps = {
    reference: referenceID,
    currency: "GHS",
    amount: 0,
    email: form.getValues("email"),
    phone: form.getValues("phoneNumber"),
    firstname: form.getValues("firstName"),
    lastname: form.getValues("lastName"),
    metadata: {
      address: form.getValues("address"),
      cart_id: referenceID,
      custom_fields: [
        {
          display_name: "Invoice ID/Reference ID",
          variable_name: "Invoice ID",
          value: referenceID,
        },
        {
          display_name: "Cart Items",
          variable_name: "cart_items",
          value: generateTableString(),
        },
      ],
    },
    channels: ["mobile_money", "card", "bank"],
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY!,
    // ... (rest of the initial config)
  };

  const [config, setConfig] = useState(initialConfig);

  useEffect(() => {
    const subscription = form.watch((value: any, { name, type }: any) => {
      updateConfig(form.getValues());
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const createOrder = async (reference: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
          customerInfo: {
            address: form.getValues("address"),
            phone: form.getValues("phoneNumber"),
          },
          reference: reference,
        }
      );
    } catch (error) {
      toast.error("Order could not be created! Please contact admin.");
    }
  };

  const onSuccess = (reference: object) => {
    // Implementation for whatever you want to do with reference and after success call.
    createOrder(reference.reference);
    form.reset();
    removeAll();
  };

  // you can call this function anything
  const onClose = () => {
    toast.error("Payment cancelled!");
  };
  const initializePayment = usePaystackPayment(config);

  const updateConfig = (data: CheckoutFormData) => {
    const updatedConfig = {
      ...config,
      email: data.email,
      phone: data.phoneNumber,
      amount: totalPrice + 5,
      firstname: data.firstName,
      lastname: data.lastName,
      metadata: {
        ...config.metadata,
        address: data.address,
      },
    };

    // Update the config state
    setConfig(updatedConfig);

    // Return the updated config
    return updatedConfig;
  };

  const onSubmit = async (data: CheckoutFormData) => {
    // Trigger the payment initialization with the updated config
    initializePayment(onSuccess, onClose);
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-7 lg:mt-0 lg:p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="pt-4">
            <h1 className="text-2xl font-bold text-black mb-4">
              Contact information
            </h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="border-t border-gray-200 pt-4">
            <h1 className="text-2xl font-bold text-black mt-4 mb-4">
              Delivery information
            </h1>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={items.length === 0}
            type={"submit"}
            className="w-full mt-6"
          >
            Confirm order
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
