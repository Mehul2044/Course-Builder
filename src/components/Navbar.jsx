import {Moon, Sun, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useTheme} from "@/components/theme-provider";

export function Navbar() {
    const {setTheme, theme} = useTheme();

    return (
        <nav
            className={`flex items-center justify-between p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`}>

            <div className="text-2xl font-extrabold tracking-wide">Course Builder</div>
            <div className="flex items-center space-x-8">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="secondary"
                            className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg transition-transform transform hover:scale-110 hover:bg-opacity-90 font-semibold focus:outline-none
                            ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
                            <Plus className="h-[1.2rem] w-[1.2rem]"/>
                            <span>Add</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className={`rounded-md shadow-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
                        <DropdownMenuItem
                            className={`hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}
                            onClick={() => alert("Add Module")}>
                            Add Module
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={`hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}
                            onClick={() => alert("Add Resource")}>
                            Add Resource
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={`hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}
                            onClick={() => alert("Add Link")}>
                            Add Link
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="secondary"
                            size="icon"
                            className={`relative rounded-md transition-transform transform hover:scale-105 focus:outline-none 
                            ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
                            <Sun
                                className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                            <Moon
                                className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                            <span className="sr-only">Toggle Theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className={`rounded-md shadow-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
                        <DropdownMenuItem
                            className={`hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}
                            onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={`hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}
                            onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={`hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}
                            onClick={() => setTheme("system")}>
                            System Default
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </nav>
    );
}

export default Navbar;