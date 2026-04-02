import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import type React from "react";
import "./chip.scss";

interface ChipProps {
  callBack: () => void;
  title: string;
  disabled: boolean;
}

const Chip: React.FC<ChipProps> = ({ callBack, title, disabled }) => {
  return (
    <Item
      variant="outline"
      className={`rounded-[25px] cursor-pointer w-max chip ${disabled ? "cursor-not-allowed" : ""}`}
      onClick={callBack}
    >
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
      </ItemContent>
    </Item>
  );
};

export default Chip;
