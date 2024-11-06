"use client";

import Image from "next/image";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { BsCreditCard2Front } from "react-icons/bs";
import Text from "@/components/ui/shared/Text";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { FaLanguage } from "react-icons/fa";
import DropdownProvider from "@/infrastructure/providers/DropdownProvider";
import { Query } from "appwrite";
import { useListDocuments } from "@/infrastructure/reactQuery/utils/useDocument";
import COLLECTIONS from "@/infrastructure/models/collection";

type Props = {
  params: any;
};

export default function Profile({ params: { id } }: Props) {
  const queries = [Query.equal("user_id", [`${id}`])];

  const { data: profileResult = [] } = useListDocuments(
    COLLECTIONS.profile,
    queries
  );
  console.log("🚀 ~ ProfileEdit ~ profileResult:", profileResult);

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className=" relative w-full h-[175px] flex flex-col justify-center items-center">
        {/* 1 */}
        <div className=" absolute top-0 w-full flex justify-between items-center p-5">
          <IoMdNotificationsOutline className=" text-xl" />
          <div className=" flex items-center gap-3">
            <GoHistory className=" text-xl" />
            <PiDotsThreeVerticalBold className=" text-xl" />
          </div>
        </div>
        <Image
          src={"/curve_bg.png"}
          alt="curve_bg"
          width={768}
          height={250}
          className=" w-full h-full"
        />
        {/* Profile Image */}
        <div className=" bg-bg w-[100px] h-[100px] rounded-full absolute bottom-0"></div>
      </div>
      {/* Content */}
      <div className=" flex flex-col gap-5 w-full">
        {/* Details */}
        <div className=" flex flex-col gap-3 w-full p-5 pt-10">
          {/* card */}
          <div className="fullShadow w-full bg-bg rounded-xl flex flex-col gap-4 p-4">
            {/* 1 */}
            <div className="flex gap-2">
              <BsCreditCard2Front className=" text-lg" />
              <Link href={"/profile/edit"}>
                <Text size={"subHeader"}>Edit Information</Text>
              </Link>
            </div>
            {/* 2 */}
            <div className="flex gap-2 justify-between">
              <div className=" flex items-center gap-2">
                <IoMdNotificationsOutline className=" text-xl" />
                <Text size={"subHeader"}>Notification</Text>
              </div>
              <Switch />
            </div>
            {/* 3 */}
            <div className="flex gap-2 justify-between">
              <div className=" flex items-center gap-2">
                <FaLanguage className=" text-xl" />
                <Text size={"subHeader"}>Language</Text>
              </div>
              <DropdownProvider Comp={<></>}>
                <Text className=" text-blue-600">English</Text>
              </DropdownProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
