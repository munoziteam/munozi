import { Button } from "@/components/ui/button";
import Text from "@/components/ui/shared/Text";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";

type Props = {};

export default function Card({}: Props) {
  return (
    <div className="min-w-[130px] w-[130px]  flex flex-col justify-between rounded-2xl">
      {/* 1 */}
      <Image
        src={"/product.jpg"}
        alt="card_image"
        width={100}
        height={100}
        className=" w-full rounded-xl h-[140px]"
      />
      {/* 2 */}
      <div className=" w-full bg-white min-h-[50px] rounded-b-2xl"></div>
    </div>
  );
}
