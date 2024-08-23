import PropTypes from "prop-types";
import {FileText, Link, File, Edit, Trash2, ArrowDownToLine, MoreHorizontal} from "lucide-react";
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
        <div className="flex gap-3  items-center py-4 ml-14 border-b last:border-0">
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
                <DropdownMenuContent align="end"
                                     className="rounded-md shadow-lg min-w-[14rem] bg-white text-gray-600 font-medium">
                    <DropdownMenuItem
                        className="py-[0.6rem] text-base flex">
                        <Edit className="mr-2 h-4 w-4"/> <span> Rename</span>
                    </DropdownMenuItem>
                    {props.item.type !== "link" && <DropdownMenuItem
                        className="py-[0.6rem] text-base flex border-b-2">
                        <ArrowDownToLine className="mr-2 h-4 w-4"/><span>Download</span>
                    </DropdownMenuItem>}
                    <DropdownMenuItem
                        className="py-[0.6rem] text-base flex text-red-600">
                        <Trash2 className="mr-2 h-4 w-4"/><span> Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

SubListItem.propTypes = {
    item: PropTypes.shape({
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }).isRequired,
};

export default SubListItem;