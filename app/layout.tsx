import { Urbanist } from "next/font/google";

import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TopNav from "@/components/top-nav";

import "./globals.css";

const font = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "Ernest Links | Elevate your laptop experience, Choose Ernest Links!",
  description: "Your one-stop shop for laptops and computer accessories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <ModalProvider />
        <TopNav />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
