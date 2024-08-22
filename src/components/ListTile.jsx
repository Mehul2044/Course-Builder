import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  ChevronDown,
  PencilLine,
  Trash2,
  ChevronUp,
} from "lucide-react";
import SubListItem from "@/src/components/SubListItem.jsx";

const ListTile = (props) => {
  const [isSubListVisible, setIsSubListVisible] = useState(false);

  const data = {
    leadingButton: isSubListVisible ? <ChevronDown /> : <ChevronUp />,
    title: props.module.title,
    subtitle:
      props.module.noOfItems === 0
        ? "No items"
        : `${props.module.noOfItems} items`,
    onEdit: () => alert("Edit clicked"),
    onDelete: () => alert("Delete clicked"),
  };

  return (
    <div className="flex flex-col p-6 border shadow-lg w-4/5 mx-auto rounded-lg my-4"
    
    >
      <div className="flex items-center justify-between"
      onClick={() => setIsSubListVisible(!isSubListVisible)}
      >
        <Button
          variant="secondary"
          size="icon"
          className="mr-4"
          onClick={() => setIsSubListVisible(!isSubListVisible)}
        >
          {data.leadingButton}
        </Button>
        <div className="flex-1" 
        style={{ userSelect: 'none' }}>
        
          <div className="text-lg font-medium">{data.title}</div>
          <div className="text-sm text-muted-foreground">{data.subtitle}</div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="ml-4">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-md shadow-lg min-w-[16rem] bg-white text-gray-600 font-medium"
          >
            <DropdownMenuItem
              onClick={data.onEdit}
              className="py-[0.6rem] text-base flex"
            >
              <PencilLine className="mr-2 h-4 w-4 "/> <span>Edit module name </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={data.onDelete}
              className="py-[0.6rem] text-red-600 text-base flex "
            >
              <Trash2 className="mr-2 h-4 w-4 " />
              <span> Delete </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isSubListVisible && (
        <div className="mt-4">
          {props.module.items.map((item) => (
            <SubListItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListTile;