"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";
import { QueryParamProvider } from "use-query-params";
import NextAdapterApp from "next-query-params/app";

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
      <QueryParamProvider adapter={NextAdapterApp}>
        <QueryClientProvider client={queryClient}>
          {mounted ? (
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          ) : (
            <div className="light-theme" suppressHydrationWarning>
              {children}
            </div>
          )}
        </QueryClientProvider>
      </QueryParamProvider>
    </SessionProvider>
  );
}
