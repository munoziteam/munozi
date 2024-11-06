import Image from "next/image";

type Props = {
  route: any;
};

export default function Header({ route }: Props) {
  return (
    <>
      {route === "form" ? (
        <Image
          src={"/customer_register.png"}
          alt="illustration"
          width={200}
          height={150}
        />
      ) : (
        <Image
          src={"/customer_otp.png"}
          alt="illustration"
          width={200}
          height={150}
        />
      )}
    </>
  );
}
