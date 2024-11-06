"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  children: React.ReactNode;
  Comp: any;
};

export default function DropdownProvider({ children, Comp }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>{Comp && <Comp />}</DropdownMenuContent>
    </DropdownMenu>
  );
}
