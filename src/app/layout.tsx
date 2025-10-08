import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/providers/session-provider";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "CBT App",
  description: "Computer Based Test Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased `}
      >
         <header className="p-6 bg-blue-600 text-white text-2xl font-extrabold">
          CBT APP
        </header>
      <NextAuthProvider>
        <main className="self-center">{children}</main>
      </NextAuthProvider>
        

        <footer className="w-full fixed bottom-0 self-center p-4 text-center text-sm text-gray-600 bg-blue-100">
          © 2025 CBT App
        </footer>
      </body>
    </html>
  );
}
