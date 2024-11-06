"use client";

import Image from "next/image";
import { IoIosSettings, IoMdNotificationsOutline } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { BsCreditCard2Front, BsFillPersonFill } from "react-icons/bs";
import Text from "@/components/ui/shared/Text";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { FaHeart, FaLanguage } from "react-icons/fa";
import DropdownProvider from "@/infrastructure/providers/DropdownProvider";
import { Query } from "appwrite";
import { useListDocuments } from "@/infrastructure/reactQuery/utils/useDocument";
import COLLECTIONS from "@/infrastructure/models/collection";
import SelectLanguage from "@/components/global/shared/SelectLanguage";
import { FaBagShopping, FaCartShopping, FaPerson } from "react-icons/fa6";
import Footer from "@/components/global/shared/Footer";

type Props = {
  params: any;
};

export default function Profile({ params: { id } }: Props) {
  const queries = [Query.equal("user_id", [`${id}`])];

  const { data: { documents: profileResult = [] } = [] } = useListDocuments(
    COLLECTIONS.profile,
    queries
  );

  const profileData = profileResult[0];

  return (
    <div className="flex flex-col w-full gap-5">
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
        <div className=" bg-bg w-[100px] h-[100px] rounded-full absolute bottom-0 p-4">
          <BsFillPersonFill className=" text-gray-300 text-xl w-full h-full" />
        </div>
      </div>
      {/* Content */}
      <div className=" flex flex-col gap-5 w-full items-center">
        <div className=" w-full flex flex-col items-center">
          <Text size={"header"}>{`${profileData?.first_name ?? ""} ${
            profileData?.last_name ?? ""
          }`}</Text>
          <Text>{`${profileData?.email ?? ""}`}</Text>
        </div>
        {/* Details */}
        <div className=" flex flex-col gap-3 w-full p-5 pt-5">
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
              <DropdownProvider Comp={SelectLanguage}>
                <Text className=" text-blue-600">English</Text>
              </DropdownProvider>
            </div>
          </div>
          {/* card 2*/}
          <div className="fullShadow w-full bg-bg rounded-xl flex flex-col gap-4 p-4">
            {/* 1 */}
            <div className="flex gap-2">
              <FaCartShopping className=" text-lg" />
              <Link href={"/cart"}>
                <Text size={"subHeader"}>My Carts</Text>
              </Link>
            </div>
            {/* 2 */}
            <div className="flex gap-2">
              <FaPerson className=" text-lg" />
              <Link href={"/profile/edit"}>
                <Text size={"subHeader"}>Deliver with shopper</Text>
              </Link>
            </div>
          </div>
          {/* card 3*/}
          <div className="fullShadow w-full bg-bg rounded-xl flex flex-col gap-4 p-4">
            {/* 1 */}
            <div className="flex gap-2">
              <FaBagShopping className=" text-lg" />
              <Link href={"/orders"}>
                <Text size={"subHeader"}>Orders</Text>
              </Link>
            </div>
            {/* 2 */}
            <div className="flex gap-2">
              <FaHeart className=" text-lg" />
              <Link href={"/favourites"}>
                <Text size={"subHeader"}>Your Favourites</Text>
              </Link>
            </div>
            {/* 3 */}
            <div className="flex gap-2">
              <IoIosSettings className=" text-xl" />
              <Link href={"/settings"}>
                <Text size={"subHeader"}>Settings</Text>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
