'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store, persistor } from "./form-builder/builder-store/store";
import { PersistGate } from "redux-persist/integration/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </body>
      </Provider>

    </html>
  );
}
