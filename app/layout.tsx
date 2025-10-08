import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ClientWrapper } from "@/components/providers/client-wrapper";
import { Toaster } from "sonner";
import ChatBot from "@/components/ChatBot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "4C Research Group",
  description:
    "4C Research Group - Cognition, Consciousness, Critical Care and Comfort Research",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "4C Research",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/logo.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/logo.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/logo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e40af",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientWrapper>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <main>{children}</main>
              <Toaster />
              {/* <ChatBot /> */}
            </ThemeProvider>
          </AuthProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}
