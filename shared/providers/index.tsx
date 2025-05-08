"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";
// import { QueryParamProvider } from "use-query-params";
// import NextAdapterApp from "next-query-params/app";
import { queryClient } from "../utils/query-client";
import { GlobalDialogProvider } from "./global-dialog-provider";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SessionProvider basePath="/auth">
      {/* <QueryParamProvider adapter={NextAdapterApp}> */}
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
    </SessionProvider>
  );
}
