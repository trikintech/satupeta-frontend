"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";

const queryClient = new QueryClient();

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {/* Only render ThemeProvider after mounting to avoid hydration issues */}
        {mounted ? (
          <ThemeProvider
            attribute="class"
            defaultTheme="light" // Default to light, system detection happens client-side
            enableSystem={false} // Disable immediate system preference to prevent flash
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        ) : (
          // Render without ThemeProvider initially
          <div className="light-theme" suppressHydrationWarning>
            {children}
          </div>
        )}
      </QueryClientProvider>
    </SessionProvider>
  );
}
