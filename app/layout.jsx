import "./globals.css";
import { Anton, Manrope } from "next/font/google";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Header from "@/components/header";
import Home from "./page";
import Footer from "@/components/footer";

config.autoAddCss = false;
// Désactive l'injection automatique du CSS de Font Awesome par React
// On l’importe manuellement pour éviter les doublons ou conflits

const anton = Anton({
  variable: '--font-anton',
  weight: '400',
  subsets: ['latin'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500', '700']
});


export default function RootLayout({ children }) {
	// Composant RootLayout qui enveloppe toute l'application
// children : tous les composants enfants qui seront rendus dans le layout
  return (
    <html lang="fr">
      <body suppressHydrationWarning className={`${anton.variable} ${manrope.variable}`}>
		 {/* 
          suppressHydrationWarning : évite les warnings liés au rendu côté client vs serveur
          className : applique les polices Anton et Manrope via les variables CSS
        */}
		<Header />
		{children}
		{/* <Main allRecipes={allRecipes}/> */}
		<Footer />
      </body>
    </html>
  );
}
