"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormInput from "@/components/ui/shared/FormInput";
import Text from "@/components/ui/shared/Text";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGlobalStore } from "@/infrastructure/zustand/store";
import auth from "@/infrastructure/appwrite/auth";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register({ setRoute }: { setRoute: any }) {
  const { setIsLoading, setOnboardData } = useGlobalStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);

      const { ...payload } = data;

      const userId = await auth.sendEmailOtp(payload.email);
      localStorage.setItem("userId", userId);
      localStorage.setItem("email", payload.email);
      setOnboardData(payload);
      setRoute("otp");
      reset();
    } catch (err: any) {
      console.log("🚀 ~ onSubmit ~ err:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 mt-3 w-full"
    >
      {/* Email Input */}
      <FormInput
        label="Email"
        id="email"
        type="email"
        register={register("email")}
        error={errors.email}
      />

      {/* Submit Button */}
      <Button type="submit" className="py-3 text-white text-lg">
        Sign In
      </Button>

      {/* Sign Up Link */}
      <Text className="text-center">
        Already have an account?{" "}
        <Link href="/register" className="text-primary">
          Sign Up
        </Link>
      </Text>
    </form>
  );
}
