import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {};

export default function Card({}: Props) {
  return (
    <div className="min-w-[130px] w-[130px]  flex flex-col justify-between rounded-2xl bg-bg">
      {/* 1 */}
      <Image
        src={"/store_owner.png"}
        alt="card_image"
        width={100}
        height={100}
        className=" w-full rounded-xl h-[140px]"
      />
      {/* 2 */}
      <div className=" p-4 flex justify-center items-center">
        <Button className=" rounded-xl">Store Owner</Button>
      </div>
    </div>
  );
}
