import { useSearchParams } from "next/navigation";

export function useTabState() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "all";

  return {
    currentTab,
  };
}
