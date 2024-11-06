import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function OtpInput({ values, setValues }: any) {
  return (
    <InputOTP
      value={values}
      onChange={(value) => setValues(value)}
      maxLength={6}
    >
      <InputOTPGroup className="flex justify-between gap-4">
        <InputOTPSlot index={0} className=" bg-bg" />
        <InputOTPSlot index={1} className=" bg-bg" />
        <InputOTPSlot index={2} className=" bg-bg" />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup className="flex justify-between gap-4">
        <InputOTPSlot index={3} className=" bg-bg" />
        <InputOTPSlot index={4} className=" bg-bg" />
        <InputOTPSlot index={5} className=" bg-bg" />
      </InputOTPGroup>
    </InputOTP>
  );
}
