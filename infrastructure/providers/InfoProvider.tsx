import { cn } from "@/lib/utils";
import { FaQuestionCircle } from "react-icons/fa";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
  className?: string;
  info: string;
};

export default function InfoProvider({ children, className, info }: Props) {
  return (
    <div className={cn(" flex gap-2 items-center", className)}>
      {children}
      <FaQuestionCircle
        className=" cursor-pointer"
        onClick={() => toast.info(info)}
      />
    </div>
  );
}
