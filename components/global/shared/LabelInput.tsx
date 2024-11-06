import { Input } from "@/components/ui/input";
import Text from "@/components/ui/shared/Text";

type Props = {
  label: string;
  setter: any;
  placeholder?: string;
  isDisabled?: boolean;
};

export default function LabelInput({
  label,
  setter,
  placeholder,
  isDisabled,
}: Props) {
  return (
    <div className=" flex  flex-col gap-1 border-[1.5px] w-full p-2 rounded-md">
      <Text>{label}</Text>
      {isDisabled ? (
        <div className=" w-full h-[25px] shadow text-primary3 px-3 rounded-md">
          {placeholder}
        </div>
      ) : (
        <Input
          className=" w-full h-[25px] shadow"
          onChange={(e) => setter(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
