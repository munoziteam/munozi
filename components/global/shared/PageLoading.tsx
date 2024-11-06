"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";

import { useGlobalStore } from "@/infrastructure/zustand/store";
import Loader from "@/components/ui/shared/Loader";

type Props = {
  className?: string;
};

export default function PageLoading({ className }: Props) {
  const { isLoading } = useGlobalStore();
  useEffect(() => {
    const element = document.getElementById("body") as HTMLElement | null;

    if (isLoading && element) {
      element.style.overflowY = "hidden"; // Modify overflow style when component mounts
    }

    // Cleanup function to reset the style when component unmounts
    return () => {
      if (element) {
        element.style.overflowY = "scroll"; // Reset overflow style on unmount
      }
    };
  }, [isLoading]);
  return (
    <>
      {isLoading && (
        <div
          className={cn(
            `fixed top-0 left-0 right-0 bottom-0 bg-white/50 flex justify-center items-center`,
            className
          )}
        >
          <Loader />
        </div>
      )}
    </>
  );
}
