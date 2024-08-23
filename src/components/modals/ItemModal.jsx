import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {moduleActions} from "@/src/store/module-slice.js";
import PropTypes from "prop-types";

function ItemModal(props) {
    const [inputValue, setInputValue] = useState("");
    const [url, setUrl] = useState("");
    const dispatch = useDispatch();

    const handleAddLink = () => {
        if (inputValue.length === 0 || url.length === 0) {
            alert("All fields are required");
            return;
        }
        setInputValue("");
        setUrl("");
        dispatch(moduleActions.addItemNoModule({name: inputValue, url: url, type: "link"}));
        props.onClose();
    };

    const handleEditLink = () => {
        if (inputValue.length === 0 || url.length === 0) {
            alert("All fields are required");
            return;
        }
        setInputValue("");
        setUrl("");
        dispatch(moduleActions.updateItem({
            itemId: props.itemId,
            moduleId: props.moduleId,
            name: inputValue,
            url: url,
            type: "link"
        }));
        props.onClose();
    };

    const handleRenameFile = () => {
        if (inputValue.length === 0) {
            alert("File name cannot be empty");
            return;
        }
        setInputValue("");
        dispatch(moduleActions.updateItem({moduleId: props.moduleId, itemId: props.itemId, name: inputValue}));
        props.onClose();
    };

    return (
        <Dialog open={true} onOpenChange={props.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {props.type === "addlink" && "Add New Link"}
                        {props.type === "editlink" && "Edit Link"}
                        {props.type === "renameFile" && "Rename File"}
                    </DialogTitle>
                    <DialogDescription>
                        {props.type === "addlink" && "Add a new link to your module."}
                        {props.type === "editlink" && "Edit the link in your module."}
                        {props.type === "renameFile" && "Rename the file in your module."}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                        {props.type === "addlink" && "Display Name"}
                        {props.type === "editlink" && "Display Name"}
                        {props.type === "renameFile" && "File Name"}
                    </label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                {(props.type === "addlink" || props.type === "editlink") && (
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">URL</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>
                )}
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        onClick={props.onClose}>
                        Cancel
                    </button>
                    <button
                        onClick={
                            props.type === "addlink" ? handleAddLink :
                                props.type === "editlink" ? handleEditLink :
                                    handleRenameFile
                        }
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        {props.type === "addlink" && "Add"}
                        {props.type === "editlink" && "Edit"}
                        {props.type === "renameFile" && "Rename"}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

ItemModal.propTypes = {
    type: PropTypes.oneOf(["addlink", "editlink", "renameFile"]).isRequired,
    onClose: PropTypes.func.isRequired,
    itemId: PropTypes.string,
    moduleId: PropTypes.string,
};

export default ItemModal;