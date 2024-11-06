"use client";

import { useEffect } from "react";
import auth from "../appwrite/auth";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalStore } from "../zustand/store";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { setUser } = useGlobalStore();

  const except = ["/register", "/login"];

  useEffect(() => {
    let isMounted = true;

    const handleAuth = async () => {
      try {
        const user = await auth.getUser();
        setUser(user);

        // Redirect only if necessary to avoid redundant navigations
        if (except.includes(pathname) && user) {
          router.push("/");
        } else if (!except.includes(pathname) && !user) {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Sorry! you could not be validated, try again later.");
      }
    };

    // Call the function only if the component is still mounted
    if (isMounted) handleAuth();

    // Cleanup function to handle component unmounting
    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  return <>{children}</>;
}
