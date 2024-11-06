"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InvalidationProvider } from "@/infrastructure/reactQuery/utils/InvalidationContext";

// Configure your QueryClient with global defaults and settings
const queryClient = new QueryClient({
  defaultOptions: {
    // queries: {
    //   staleTime: 1000 * 60 * 5,
    //   cacheTime: 1000 * 60 * 10,
    // },
    // mutations: {},
  },
});

export default function QueryProviderComp({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <InvalidationProvider>{children}</InvalidationProvider>
    </QueryClientProvider>
  );
}
