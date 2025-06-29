"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't show loading state, let layout handle it
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
