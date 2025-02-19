import React, { ReactNode } from "react";

type ProductsLayoutProps = {
  children: ReactNode;
};

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return <main>{children}</main>;
}
