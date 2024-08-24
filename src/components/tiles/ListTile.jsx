import PropTypes from "prop-types";
import {useState} from "react";
import {Button} from "@/components/ui/button.jsx";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu.jsx";
import {MoreHorizontal, ChevronDown, PencilLine, Trash2, ChevronUp} from "lucide-react";
import SubListItem from "@/src/components/tiles/SubListItem.jsx";
import ModuleModal from "@/src/components/modals/ModuleModal.jsx";
import {moduleActions} from "@/src/store/module-slice.js";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";

const ListTile = (props) => {
    const [{isDragging}, drag] = useDrag({
        type: 'MODULE',
        item: {id: props.module.id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ['ITEM', 'MODULE'],
        drop: (droppedItem, monitor) => {
            if (monitor.getItemType() === 'ITEM') {
                if (droppedItem.moduleId === props.module.id) {
                    dispatch(moduleActions.moveItemInternal({
                        moduleId: props.module.id,
                        itemId: droppedItem.id,
                        targetItemId: null
                    }));
                    return;
                }
                dispatch(moduleActions.moveItemExternal({
                    fromModuleId: droppedItem.moduleId,
                    toModuleId: props.module.id,
                    itemId: droppedItem.id
                }));
            } else if (monitor.getItemType() === 'MODULE') {
                dispatch(moduleActions.moveModule({
                    moduleId: droppedItem.id,
                    targetModuleId: props.module.id,
                }));
            }
        },
    });

    const [isSubListVisible, setIsSubListVisible] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const dispatch = useDispatch();

    const data = {
        leadingButton: isSubListVisible ? <ChevronUp/> : <ChevronDown/>,
        title: props.module.title,
        subtitle:
            props.module.noOfItems === 0
                ? "No items"
                : `${props.module.noOfItems} items`,
        onEdit: () => setIsEditModalOpen(true),
        onDelete: () => dispatch(moduleActions.removeModule({id: props.module.id})),
    };

    return (
        <>
            <div ref={(node) => drag(drop(node))} style={{opacity: isDragging ? 0.5 : 1}}
                 className="flex flex-col p-6 border shadow-lg w-4/5 mx-auto rounded-lg my-4">
                <div className="flex items-center justify-between"
                     onClick={() => setIsSubListVisible(!isSubListVisible)}>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="mr-4"
                        onClick={() => setIsSubListVisible(!isSubListVisible)}>
                        {data.leadingButton}
                    </Button>
                    <div className="flex-1"
                         style={{userSelect: 'none'}}>

                        <div className="text-lg font-medium">{data.title}</div>
                        <div className="text-sm text-muted-foreground">{data.subtitle}</div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="ml-4">
                                <MoreHorizontal/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="rounded-md shadow-lg min-w-[16rem] bg-white text-gray-600 font-medium">
                            <DropdownMenuItem
                                onClick={data.onEdit}
                                className="py-[0.6rem] text-base flex">
                                <PencilLine className="mr-2 h-4 w-4 "/> <span>Edit module name </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={data.onDelete}
                                className="py-[0.6rem] text-red-600 text-base flex ">
                                <Trash2 className="mr-2 h-4 w-4 "/>
                                <span> Delete </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {isSubListVisible && (
                    <div className="mt-4">
                        {props.module.items.map((item) => (
                            <SubListItem key={item.id} item={item} moduleId={props.module.id}/>
                        ))}
                    </div>
                )}
            </div>

            {isEditModalOpen &&
                <ModuleModal onClose={() => setIsEditModalOpen(false)} type={"edit"} moduleId={props.module.id}
                             moduleName={props.module.title}/>}

        </>
    );
};

ListTile.propTypes = {
    module: PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        noOfItems: PropTypes.number.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired
};

export default ListTile;