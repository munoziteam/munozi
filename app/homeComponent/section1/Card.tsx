import { Button } from "@/components/ui/button";
import Text from "@/components/ui/shared/Text";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";

type Props = {};

export default function Card({}: Props) {
  return (
    <div className=" bg-primary min-w-[250px] w-[250px] rounded-xl flex justify-between gap-4 p-3">
      {/* 1 */}
      <div className=" flex flex-col gap-1 w-[40%] justify-between">
        <Text>Order Grocery and Electron get a fast dedelivery</Text>
        <div className=" flex gap-3 items-center bg-bg text-foreground w-fit px-2 py-1 rounded-md">
          <p className=" text-[8px] font-bold whitespace-nowrap">
            Browse Offer
          </p>
          <FaLongArrowAltRight />
        </div>
      </div>
      {/* 2 */}
      <Image
        src={"/card_image.png"}
        alt="card_image"
        width={100}
        height={100}
        className=" w-full rounded-xl"
      />
    </div>
  );
}
