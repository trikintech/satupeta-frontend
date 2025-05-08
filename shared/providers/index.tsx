"use client";

import { ReactNode, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";
import { queryClient } from "../utils/query-client";
import { GlobalDialogProvider } from "./global-dialog-provider";
import { useAuthApi } from "../hooks/use-auth-api";

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
    <SessionProvider basePath="/auth" refetchInterval={0}>
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
