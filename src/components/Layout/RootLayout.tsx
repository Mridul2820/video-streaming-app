import React from "react";
import dynamic from "next/dynamic";
import StoreProvider from "@/redux/provider";

interface LayoutProps {
  children: React.ReactNode;
}
const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default RootLayout;
