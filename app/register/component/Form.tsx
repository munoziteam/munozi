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
import { toast } from "sonner";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only numbers"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
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
      if (!data.agreeToTerms) {
        toast.error("You must agree to our terms");
        return;
      }
      setIsLoading(true);

      const { ...payload } = data;

      const userId = await auth.sendEmailOtp(payload.email);
      localStorage.setItem("userId", userId);
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
      {/* First Name Input */}
      <FormInput
        label="First Name"
        id="firstName"
        type="text"
        register={register("firstName")}
        error={errors.firstName}
      />
      {/* Last Name Input */}
      <FormInput
        label="Last Name"
        id="lastName"
        type="text"
        register={register("lastName")}
        error={errors.lastName}
      />
      {/* Email Input */}
      <FormInput
        label="Email"
        id="email"
        type="email"
        register={register("email")}
        error={errors.email}
      />
      {/* Phone Number Input */}
      <FormInput
        label="Phone Number"
        id="phone"
        type="text"
        register={register("phoneNumber")}
        error={errors.phoneNumber}
      />
      Agree to Terms Checkbox
      <div className="flex items-center">
        <input
          type="checkbox"
          id="agreeToTerms"
          className="mr-2 cursor-pointer
               w-6 h-6 text-[#346D4D]
                rounded focus:ring-[#346D4D]"
          {...register("agreeToTerms")}
        />
        <label htmlFor="agreeToTerms" className="text-sm">
          By signing up, you are agreeing to our{" "}
          <Link href="/terms" className="text-black">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary">
            Privacy Policy
          </Link>
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="text-red-600 text-sm mt-1">
          {errors.agreeToTerms.message}
        </p>
      )}
      {/* Submit Button */}
      <Button type="submit" className=" text-white text-lg">
        Sign Up
      </Button>
      {/* Sign In Link */}
      <Text className="text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-primary">
          Sign In
        </Link>
      </Text>
    </form>
  );
}
