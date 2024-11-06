import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Text from "./Text";
import { Button } from "../button";

type Props = {};

export default function Backbutton({}: Props) {
  return (
    <Link className="" href={"/listing"}>
      <Button className=" flex items-center gap-4">
        <FaLongArrowAltLeft className=" text-xl cursor-pointer text-white" />
        <Text size={"subHeader"} className=" font-gordita">
          Return
        </Text>
      </Button>
    </Link>
  );
}
