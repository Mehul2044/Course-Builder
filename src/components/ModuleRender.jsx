import {useSelector} from "react-redux";
import ListTile from "@/src/components/tiles/ListTile.jsx";
import SubListItem from "@/src/components/tiles/SubListItem.jsx";

function ModuleRender() {
    const modules = useSelector(state => state.module.modules);
    const unassignedItems = useSelector(state => state.module.unassignedItems);

    return (
        <>
            <div>
                {modules.map(module => (
                    <ListTile key={module.id} module={module}/>
                ))}
            </div>
            {unassignedItems.length !== 0 && <div>
                {unassignedItems.map((item) => (
                    <SubListItem key={item.id} item={item}/>
                ))}
            </div>}
        </>
    );
}

export default ModuleRender;