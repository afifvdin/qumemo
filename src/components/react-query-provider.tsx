"use client";

import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.message === "ERR_NETWORK") {
          toast.dismiss();
          toast.error("Network Unavailable");
        }
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.message === "ERR_NETWORK") {
          toast.dismiss();
          toast.error("Network Unavailable");
        }
      }
    },
  }),
});

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
