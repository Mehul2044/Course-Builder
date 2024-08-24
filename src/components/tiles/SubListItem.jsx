import PropTypes from "prop-types";
import {FileText, Link, File, Edit, Trash2, ArrowDownToLine, MoreHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu.jsx";
import {useState} from "react";
import ItemModal from "@/src/components/modals/ItemModal.jsx";
import {useDispatch} from "react-redux";
import {moduleActions} from "@/src/store/module-slice.js";
import {useDrag, useDrop} from "react-dnd";

const SubListItem = (props) => {
    const [{isDragging}, drag] = useDrag({
        type: 'ITEM',
        item: {id: props.item.id, moduleId: props.moduleId},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, ref] = useDrop({
        accept: 'ITEM',
        hover: (draggedItem) => {
            if (draggedItem.id !== props.item.id) {
                dispatch(moduleActions.moveItemInternal({
                    moduleId: props.moduleId,
                    itemId: draggedItem.id,
                    targetItemId: props.item.id
                }));
            }
        },
    });

    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const dispatch = useDispatch();

    const deleteHandler = () => {
        dispatch(moduleActions.removeItem({moduleId: props.moduleId, itemId: props.item.id}));
    }

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

    const clickHandler = () => {
        window.open(props.item.url, "_blank");
    }

    const downloadHandler = () => {
        const link = document.createElement('a');
        link.href = props.item.url;
        link.setAttribute('download', props.item.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <>
            <div ref={(node) => drag(ref(node))} style={{opacity: isDragging ? 0.5 : 1}}
                 className={props.moduleId ? "flex gap-3 items-center py-4 ml-14 border-b last:border-0" : "flex gap-3 items-center py-4 px-4 border shadow-lg w-4/5 mx-auto rounded-lg my-4"}>
                {getIcon(props.item.type)}
                <div className="flex-1" onClick={clickHandler}>
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
                            onClick={() => {
                                if (props.item.type === "link") {
                                    setIsEditModalOpen(true);
                                } else {
                                    setIsRenameModalOpen(true);
                                }
                            }}
                            className="py-[0.6rem] text-base flex">
                            <Edit className="mr-2 h-4 w-4"/>
                            <span>{props.item.type === "link" ? "Edit" : "Rename"}</span>
                        </DropdownMenuItem>
                        {props.item.type !== "link" && <DropdownMenuItem onClick={downloadHandler}
                                                                         className="py-[0.6rem] text-base flex border-b-2">
                            <ArrowDownToLine className="mr-2 h-4 w-4"/><span>Download</span>
                        </DropdownMenuItem>}
                        <DropdownMenuItem onClick={deleteHandler}
                                          className="py-[0.6rem] text-base flex text-red-600">
                            <Trash2 className="mr-2 h-4 w-4"/><span> Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {isRenameModalOpen &&
                <ItemModal onClose={() => setIsRenameModalOpen(false)} type={"renameFile"} itemId={props.item.id}
                           moduleId={props.moduleId} itemName={props.item.name}/>}
            {isEditModalOpen &&
                <ItemModal onClose={() => setIsEditModalOpen(false)} type={"editlink"} itemId={props.item.id}
                           moduleId={props.moduleId} itemName={props.item.name} itemUrl={props.item.url}/>}

        </>
    );
};

SubListItem.propTypes = {
    item: PropTypes.shape({
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
    moduleId: PropTypes.string,
};

export default SubListItem;