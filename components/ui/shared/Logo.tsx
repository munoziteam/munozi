import Image from "next/image";

type Props = {};

export default function Logo({}: Props) {
  return (
    <div className=" rounded-full w-[35px] h-[35px]">
      <Image
        width={35}
        height={35}
        src={"/logo.png"}
        alt="logo"
        className=" w-full h-full object-cover"
      />
    </div>
  );
}
