import {FileText, Link, File, Edit, Trash, MoreHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "@/components/ui/dropdown-menu";

const SubListItem = (props) => {
    const getIcon = (type) => {
        switch (type) {
            case "pdf":
                return <FileText className="mr-2 h-4 w-4"/>;
            case "link":
                return <Link className="mr-2 h-4 w-4"/>;
            default:
                return <File className="mr-2 h-4 w-4"/>;
        }
    };

    return (
        <div className="flex items-center p-2 border-b last:border-0">
            {getIcon(props.item.type)}
            <div className="flex-1">
                <div className="text-sm font-medium">{props.item.name}</div>
                <div className="text-xs text-muted-foreground">{props.item.type.toUpperCase()}</div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="ml-2">
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4"/> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Trash className="mr-2 h-4 w-4"/> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default SubListItem;