import { Suspense } from "react";
import LoginPageClient from "./page.client";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageClient />
    </Suspense>
  );
}
