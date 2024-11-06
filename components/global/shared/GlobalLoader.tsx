import Loader from "@/components/ui/shared/Loader";
import { cn } from "@/lib/utils";
import { useIsMutating } from "@tanstack/react-query";
import { useEffect } from "react";

type Props = {
  className?: string;
};

export default function GlobalLoader({ className }: Props) {
  const isMutating = useIsMutating();
  useEffect(() => {
    const element = document.getElementById("body") as HTMLElement | null;

    if (isMutating && element) {
      element.style.overflowY = "hidden"; // Modify overflow style when component mounts
    }

    // Cleanup function to reset the style when component unmounts
    return () => {
      if (element) {
        element.style.overflowY = "scroll"; // Reset overflow style on unmount
      }
    };
  }, [isMutating]);
  return (
    <>
      {isMutating > 0 && (
        <div
          className={cn(
            `fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center`,
            className
          )}
        >
          <Loader />
        </div>
      )}
    </>
  );
}
