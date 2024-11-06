type Props = {};

import { BiSolidCategory } from "react-icons/bi";
import { TbHomeFilled } from "react-icons/tb";
import { IoStorefront } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { BsFillPersonFill } from "react-icons/bs";
import Text from "@/components/ui/shared/Text";
import Link from "next/link";
import { useGlobalStore } from "@/infrastructure/zustand/store";

export default function Footer({}: Props) {
  const { user } = useGlobalStore();
  return (
    <div className=" flex justify-between items-center gap-4 p-4 bg-bg-bg">
      <Link href={"/"} className=" flex flex-col gap-2 items-center">
        <TbHomeFilled className=" text-black text-2xl" />
        <Text size={"subHeader"}>Home</Text>
      </Link>
      <div className=" flex flex-col gap-2 items-center">
        <BiSolidCategory className=" text-black text-2xl" />
        <Text size={"subHeader"}>Category</Text>
      </div>
      <div className=" flex flex-col gap-2 items-center">
        <IoStorefront className=" text-black text-2xl" />
        <Text size={"subHeader"}>Store</Text>
      </div>
      <div className=" flex flex-col gap-2 items-center">
        <FaCartShopping className=" text-black text-2xl" />
        <Text size={"subHeader"}>Carts</Text>
      </div>
      <Link
        href={`/profile/${user?.$id}`}
        className=" flex flex-col gap-2 items-center"
      >
        <BsFillPersonFill className=" text-black text-2xl" />
        <Text size={"subHeader"}>Profile</Text>
      </Link>
    </div>
  );
}
