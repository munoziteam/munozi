"use client";
import { OtpInput } from "@/components/global/shared/OtpInput";
import { Button } from "@/components/ui/button";
import Text from "@/components/ui/shared/Text";
import auth from "@/infrastructure/appwrite/auth";
import { useGlobalStore } from "@/infrastructure/zustand/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCreateDocument } from "@/infrastructure/reactQuery/utils/useDocument";
import ResendOtp from "./ResendOtp";
import COLLECTIONS from "@/infrastructure/models/collection";
import { toast } from "sonner";

type Props = {};

export default function Otp({}: Props) {
  const [values, setValues] = useState();
  const router = useRouter();
  const { setIsLoading, onboardData } = useGlobalStore();

  const createProfileMutation = useCreateDocument(COLLECTIONS.profile);

  const createProfile = async (payload: any) => {
    try {
      const profileData = {
        first_name: payload.firstName,
        last_name: payload.lastName,
        phone_number: payload.phoneNumber,
        email: payload.email,
        user_id: localStorage.getItem("userId"),
      } as profileType | any;

      createProfileMutation.mutate(profileData);
    } catch (error) {
      console.log("🚀 ~ createProfile ~ error:", error);
    }
  };

  const handle = async () => {
    try {
      setIsLoading(true);

      const userId = localStorage.getItem("userId");
      await auth.createSession(userId, values);
      await createProfile(onboardData);
      router.push("/");
    } catch (error) {
      toast.error("Unauthorized!");
      console.log("🚀 ~ handle ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" flex flex-col gap-7 items-center">
      <Text size={"header"} className=" text-center">
        Enter the 6-digit code sent to you at:{" "}
        {onboardData?.email ?? "example@gmail.com"}
      </Text>
      <OtpInput setValues={setValues} values={values} />
      <ResendOtp />
      <Button onClick={handle} className=" w-full">
        Finish
      </Button>
    </div>
  );
}
