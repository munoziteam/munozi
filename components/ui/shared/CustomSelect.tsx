import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  placeHolder: string;
  options: { label: string; value: any }[];
  onChange: (value: any) => void; // Updated the type for onChange
  disabled?: boolean;
};

export default function CustomSelect({
  className,
  placeHolder,
  options,
  onChange,
  disabled = false,
}: Props) {
  return (
    <Select onValueChange={onChange} disabled={disabled}>
      {/* Apply the onChange here */}
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
