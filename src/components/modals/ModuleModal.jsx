import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {useState} from "react";
import {useDispatch} from "react-redux";
import {moduleActions} from "@/src/store/module-slice.js";
import PropTypes from "prop-types";

function ModuleModal(props) {
    const [moduleName, setModuleName] = useState("");
    const dispatch = useDispatch();

    const newModuleHandler = () => {
        if (moduleName.length === 0) {
            alert("Module name cannot be empty");
            return;
        }
        dispatch(moduleActions.addModule({title: moduleName}));
        setModuleName("");
        props.onClose();
    }

    const editModuleHandler = () => {
        if (moduleName.length === 0) {
            alert("Module name cannot be empty");
            return;
        }
        dispatch(moduleActions.updateModule({id: props.moduleId, title: moduleName}));
        setModuleName("");
        props.onClose();
    }

    if (props.type === "add") {
        return (
            <Dialog open={true} onOpenChange={props.onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Module</DialogTitle>
                        <DialogDescription>
                            Add a new module to your course.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Module Name</label>
                        <input
                            type="text"
                            value={moduleName}
                            onChange={(e) => setModuleName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"/>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                        <button
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            onClick={props.onClose}>
                            Cancel
                        </button>
                        <button onClick={newModuleHandler}
                                className="px-4 py-2 bg-[#008392] text-white rounded-md hover:bg-[#006b73]">
                            Create
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
    if (props.type === "edit") {
        return (
            <Dialog open={true} onOpenChange={props.onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Module</DialogTitle>
                        <DialogDescription>Edit the module name.</DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        <label className="block text-sm font-medium">Module Name</label>
                        <input
                            type="text"
                            value={moduleName}
                            placeholder={props.moduleName}
                            onChange={(e) => setModuleName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"/>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                        <button
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            onClick={props.onClose}>
                            Cancel
                        </button>
                        <button onClick={editModuleHandler}
                                className="px-4 py-2 bg-[#008392] text-white rounded-md hover:bg-[#006b73]">
                            Edit
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
    return <></>;
}

ModuleModal.propTypes = {
    type: PropTypes.oneOf(["add", "edit"]).isRequired,
    onClose: PropTypes.func.isRequired,
    moduleId: PropTypes.string,
    moduleName: PropTypes.string,
};

export default ModuleModal;