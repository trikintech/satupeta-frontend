import { PencilIcon } from "lucide-react";
import IconButton from "./icon-button";

export default function Line() {
  return IconButton({
    icon: PencilIcon,
    isActive: false,
    onClick: () => console.log("Line tool clicked"),
    label: "Line Tool",
  });
}
