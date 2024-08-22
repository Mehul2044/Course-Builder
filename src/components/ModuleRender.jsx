import { useSelector } from "react-redux";
import ListTile from "@/src/components/ListTile.jsx";

function ModuleRender() {
    const modules = useSelector(state => state.module.modules);

    return (
        <div>
            {modules.map(module => (
                <ListTile key={module.id} module={module} />
            ))}
        </div>
    );
}

export default ModuleRender;