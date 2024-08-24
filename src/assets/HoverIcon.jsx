import {useTheme} from "@/components/theme-provider.jsx";

function HoverIcon() {
    const {theme} = useTheme();

    return <div
        className={`cursor-move flex items-center justify-center p-2 ${theme === "light" ? "hover:bg-gray-200 text-gray-400" : "hover:bg-gray-700 text-gray-500"}`}>
        <div className="flex flex-col space-y-0.5">
            <span className="block w-1 h-1 bg-current rounded-full"></span>
            <span className="block w-1 h-1 bg-current rounded-full"></span>
            <span className="block w-1 h-1 bg-current rounded-full"></span>
        </div>
        <div className="flex flex-col space-y-0.5 ml-1">
            <span className="block w-1 h-1 bg-current rounded-full"></span>
            <span className="block w-1 h-1 bg-current rounded-full"></span>
            <span className="block w-1 h-1 bg-current rounded-full"></span>
        </div>
    </div>;
}

export default HoverIcon;