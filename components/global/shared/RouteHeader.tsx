import Text from "@/components/ui/shared/Text";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

type Props = {
  info: string;
};

export default function RouteHeader({ info }: Props) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // This will navigate to the previous page
  };

  return (
    <div className=" flex items-center p-5  w-full shadow">
      <FaArrowLeftLong className=" cursor-pointer" onClick={handleGoBack} />
      <div className=" text-center flex justify-center w-full">
        <Text size={"header"} className="">
          {info}
        </Text>
      </div>
    </div>
  );
}
