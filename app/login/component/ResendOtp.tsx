import Text from "@/components/ui/shared/Text";
import auth from "@/infrastructure/appwrite/auth";
import { useGlobalStore } from "@/infrastructure/zustand/store";
import { useState, useEffect } from "react";

export default function ResendOtp() {
  const [counter, setCounter] = useState(60); // Countdown timer in seconds

  useEffect(() => {
    if (counter === 0) return; // Stop countdown when it reaches zero

    const timer = setInterval(() => {
      setCounter((prev) => prev - 1); // Decrement counter by 1 every second
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [counter]);

  const { setIsLoading, onboardData } = useGlobalStore();

  const onResend = async () => {
    try {
      setIsLoading(true);

      const userId = await auth.sendEmailOtp(onboardData.email);
      localStorage.setItem("userId", userId);
    } catch (err: any) {
      console.log("🚀 ~ onSubmit ~ err:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setCounter(60); // Reset the countdown
    onResend(); // Trigger the OTP resend function
  };

  return (
    <div className="text-center">
      {counter > 0 ? (
        <div className=" p-1 px-2 bg-primary2 rounded-xl">
          <Text size={"header"} className=" text-primary3">
            Resend OTP in {counter} seconds
          </Text>
        </div>
      ) : (
        <Text
          size={"header"}
          onClick={handleResend}
          className="text-primary font-bold uppercase"
        >
          Resend OTP
        </Text>
      )}
    </div>
  );
}
