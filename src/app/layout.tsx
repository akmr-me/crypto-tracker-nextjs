import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/app/Components/Header";
import ThemeProvider from "@/app/Context/ThemeProvider";
import CryptoProvider from "./Context/CryptoContext";

const inter = Inter({ subsets: ["latin"] });
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: {
    default: "Crypto Tracker",
    template: "%s | Crypto Tracker",
  },
  description: "A Crypto price tracker app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={lato.variable}>
      <body className={inter.className}>
        <CryptoProvider>
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
        </CryptoProvider>
      </body>
    </html>
  );
}
