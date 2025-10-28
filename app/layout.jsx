import "./globals.css";
import { Anton, Manrope } from "next/font/google";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false; // Désactive l'injection automatique du CSS de Font Awesome

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
  return (
    <html lang="fr">
      <body suppressHydrationWarning className={`${anton.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
