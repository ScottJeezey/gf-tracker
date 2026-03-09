import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";

const lexendDeca = Lexend_Deca({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-lexend-deca",
});

export const metadata: Metadata = {
  title: "GF Receipt Tracker",
  description: "Track gluten-free food costs for tax deductions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexendDeca.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
