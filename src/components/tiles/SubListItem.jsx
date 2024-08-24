import PropTypes from "prop-types";
import {FileText, Link, File, Edit, Trash2, ArrowDownToLine, MoreVertical} from "lucide-react";
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
import {useTheme} from "@/components/theme-provider.jsx";

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
    const {theme} = useTheme();

    const deleteHandler = () => {
        dispatch(moduleActions.removeItem({moduleId: props.moduleId, itemId: props.item.id}));
    }

    const getIcon = (type) => {
        switch (type) {
            case "pdf":
                return (
                    <div className="bg-red-100 p-1 rounded flex items-center justify-center">
                        <FileText className="h-4 w-4 text-red-500"/>
                    </div>
                );
            case "link":
                return (
                    <div className="bg-blue-100 p-1 rounded flex items-center justify-center">
                        <Link className="h-4 w-4 text-blue-500"/>
                    </div>
                );
            default:
                return (
                    <div className="bg-green-100 p-1 rounded flex items-center justify-center">
                        <File className="h-4 w-4 text-green-500"/>
                    </div>
                );
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
                 className={props.moduleId ? "flex gap-3 items-center py-4 ml-14 border-b last:border-0" : "flex gap-3 items-center py-4 px-6 border shadow-lg w-4/5 mx-auto rounded-lg my-4"}>
                {getIcon(props.item.type)}
                <div className="flex-1 cursor-pointer" onClick={clickHandler}>
                    <div className="text-sm font-medium">{props.item.name}</div>
                    <div className="text-xs text-muted-foreground">{props.item.type.toUpperCase()}</div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div
                            className={`p-2 rounded-lg ${theme === "light" ? "hover:bg-gray-200 text-black" : "hover:bg-gray-700 text-white"} cursor-pointer`}>
                            <MoreVertical/>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end"
                                         className={`rounded-md shadow-lg min-w-[16rem] bg-white text-gray-600 font-medium ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
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