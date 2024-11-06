"use client";

import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/shared/Logo";
import { FaSearch } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import Link from "next/link";
import { useGlobalStore } from "@/infrastructure/zustand/store";

type Props = {};

export default function Header({}: Props) {
  const { user } = useGlobalStore();

  return (
    <div className=" flex items-center justify-between gap-4 py-4">
      {/* 1 */}
      <Logo />
      {/* 2 */}
      <div className=" flex justify-between items-center gap-2 bg-bg shadow-inner px-4 rounded w-full">
        <Input
          className=" w-full border-none p-0 border-transparent outline-none placeholder:font-gordita placeholder:text-black"
          placeholder="Search products, stores, and recipes"
        />
        <FaSearch />
      </div>
      {/* 3 */}
      <Link
        href={`/profile/${user?.$id}`}
        className="fullShadow rounded-full min-w-[35px] min-h-[35px] bg-bg flex justify-center items-center cursor-pointer "
      >
        <BsFillPersonFill className=" text-gray-300 text-xl" />
      </Link>
    </div>
  );
}
