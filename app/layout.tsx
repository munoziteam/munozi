import "./globals.css";
import { ThemeProvider } from "@/infrastructure/providers/theme-provider";
import QueryClientProviderComp from "@/infrastructure/reactQuery/utils/QueryProviderComp";
import { Toaster } from "sonner";
import Modal from "@/infrastructure/credenza/Modal";
import React from "react";
import PageLoading from "@/components/global/shared/PageLoading";
import AuthProvider from "@/infrastructure/providers/AuthProvider";

export const metadata = {
  manifest: "/manifest.json",
  title: "Munozi",
  description: "Munozi App",
};

export const viewport = {
  themeColor: "#FF9100",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="body" className="">
        <AuthProvider>
          <QueryClientProviderComp>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster
                position="top-center"
                richColors={true}
                pauseWhenPageIsHidden={true}
                duration={5000}
                closeButton={true}
              />
              {children}
              <Modal />
              <PageLoading />
            </ThemeProvider>
          </QueryClientProviderComp>
        </AuthProvider>
      </body>
    </html>
  );
}
