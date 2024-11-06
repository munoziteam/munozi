import * as React from "react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// export async function deleteFiles(fileUrls: string[]) {
//   const deletePromises = fileUrls.map(async (fileUrl) => {
//     const fileRef = ref(storage, fileUrl);
//     await deleteObject(fileRef);
//   });

//   try {
//     await Promise.all(deletePromises);
//     console.log("All files deleted successfully");
//   } catch (error) {
//     console.error("Error deleting some files:", error);
//   }
// }
