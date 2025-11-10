"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";



export default function HeaderManager({ children }) {
  const pathname = usePathname() || "/";
//   récupère le chemin actuel de la page ou celui de la page d'accueil si il n'y a pas de chemin
  const isRecipeRoute = pathname.startsWith("/recette");
//   vérifie que le chemin actuel comment par recette




  return (
    <>
      {!isRecipeRoute &&  <Header />}
	 {/* si le chemin de la page n'est pas celui de la recette alors l'autre
	//  Header s'affichera (Header Global) */}
      {children}
    </>
  );
}
