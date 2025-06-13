import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "4C Research Group",
  description: "Cognition, Consciousness & Critical Care Research",
  icons: {
    icon: [{ url: "/logo.png" }],
    shortcut: ["/logo.png"],
    apple: ["/logo.png"],
  },
  openGraph: {
    title: "4C Research Group",
    description: "Cognition, Consciousness & Critical Care Research",
    images: [{ url: "/logo.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1E3A8A", // Primary color
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          "min-h-screen w-full bg-background font-sans text-foreground antialiased",
          "flex flex-col"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
