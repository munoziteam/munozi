import Lottie from "lottie-react";
import animationData from "@/public/loading.json";

type Props = {};

export default function Loader({}: Props) {
  return (
    <Lottie animationData={animationData} loop={true} className="w-full h-24" />
  );
}
