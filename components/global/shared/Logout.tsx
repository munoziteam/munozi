"use client";

import auth from "@/infrastructure/appwrite/auth";
import { useGlobalStore } from "@/infrastructure/zustand/store";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { toast } from "sonner";

type Props = {};

export default function Logout({}: Props) {
  const { setIsLoading, clearUser } = useGlobalStore();

  const router = useRouter();

  const signOut = async () => {
    setIsLoading(true);
    try {
      await auth.deleteSession();
      clearUser();
      router.push("/login");
    } catch (error) {
      toast.error("Failed");
      console.log("🚀 ~ signOut ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div onClick={signOut} className=" flex items-center gap-4 px-4">
      <LuLogOut />
      <p>Sign Out</p>
    </div>
  );
}
