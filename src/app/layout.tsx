import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "./_components/topnav";
import { CartProvider } from "~/app/context/CartContext";
import { WishlistProvider } from "~/app/context/WishListContext";

export const metadata: Metadata = {
  title: "Premium Shoes Store",
  description: "Discover our handcrafted collection of premium footwear",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable}`}>
        <body className="bg-black text-white">
          <CartProvider>
            <WishlistProvider>
              <TopNav /> 
              {children}
            </WishlistProvider>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}