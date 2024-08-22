import {useState} from "react";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {MoreHorizontal, ChevronDown, Edit, Trash, ChevronUp} from "lucide-react";
import SubListItem from "@/src/components/SubListItem.jsx";

const ListTile = (props) => {
    const [isSubListVisible, setIsSubListVisible] = useState(false);

    const data = {
        leadingButton: isSubListVisible ? <ChevronDown/> : <ChevronUp/>,
        title: props.module.title,
        subtitle: props.module.noOfItems === 0 ? "No items" : `${props.module.noOfItems} items`,
        onEdit: () => alert("Edit clicked"),
        onDelete: () => alert("Delete clicked")
    };


    return (
        <div className="flex flex-col p-6 border shadow-lg w-4/5 mx-auto rounded-lg my-4">
            <div className="flex items-center justify-between">
                <Button variant="secondary" size="icon" className="mr-4"
                        onClick={() => setIsSubListVisible(!isSubListVisible)}>
                    {data.leadingButton}
                </Button>
                <div className="flex-1">
                    <div className="text-lg font-medium">{data.title}</div>
                    <div className="text-sm text-muted-foreground">{data.subtitle}</div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="ml-4">
                            <MoreHorizontal/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={data.onEdit}>
                            <Edit className="mr-2 h-4 w-4"/> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={data.onDelete}>
                            <Trash className="mr-2 h-4 w-4"/> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {isSubListVisible && (
                <div className="mt-4">
                    {props.module.items.map(item => (
                        <SubListItem key={item.id} item={item}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListTile;