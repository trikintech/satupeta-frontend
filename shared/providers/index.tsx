"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { ReactNode, useEffect, useState } from "react";

import { SessionProvider } from "next-auth/react";

import { useAuthApi } from "../hooks/use-auth-api";
import { queryClient } from "../utils/query-client";

import { GlobalDialogProvider } from "./global-dialog-provider";
import { ThemeProvider } from "./theme-provider";

function ApiAuthProvider({ children }: { children: ReactNode }) {
  useAuthApi();
  return <>{children}</>;
}

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SessionProvider
      basePath="/auth"
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
    >
      <ApiAuthProvider>
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
        {/* </QueryParamProvider> */}
        <GlobalDialogProvider />
      </ApiAuthProvider>
    </SessionProvider>
  );
}
