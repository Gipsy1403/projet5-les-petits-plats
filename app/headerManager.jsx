// app/LayoutClientWrapper.jsx
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";

export default function HeaderManager({ children }) {
  const pathname = usePathname() || "/";
  const isRecipeRoute = pathname.startsWith("/recette");

  return (
    <>
      {!isRecipeRoute && <Header />}
	 {/* header global uniquement quand on n'est pas sur /recette */}
      {children}
    </>
  );
}
