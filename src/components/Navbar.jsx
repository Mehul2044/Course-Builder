import {useState} from 'react';
import {Moon, Sun, Plus, ChevronDown, ChevronUp, Rows3, Link, ArrowUpFromLine} from "lucide-react";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useTheme} from "@/components/theme-provider";

export function Navbar() {
    const {setTheme, theme} = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav
            className={`flex items-center justify-between p-6 ${theme === 'dark' || theme === "system" ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`}>

            <div className="flex items-center w-full justify-around">
                <div className="text-2xl font-bold tracking-wider">Course Builder</div>
                <DropdownMenu onOpenChange={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <DropdownMenuTrigger asChild>
                        <div>
                            <Button
                                variant="secondary"
                                className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg transition-transform transform hover:scale-110 hover:bg-opacity-95 font-semibold focus:outline-none
                                ${theme === 'dark' ? 'bg-[rgb(213,47,75)] text-white' : 'bg-[rgb(213,47,75)] text-white'}  hover:bg-[rgb(198,34,64)]`}
                                style={{userSelect: 'none'}}>
                                <Plus className="h-[1.2rem] w-[1.2rem]"/>
                                <span>Add</span>
                                {isDropdownOpen ? (
                                    <ChevronUp className="h-[1.2rem] w-[1.2rem]"/>
                                ) : (
                                    <ChevronDown className="h-[1.2rem] w-[1.2rem]"/>
                                )}
                            </Button>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className={`rounded-md shadow-lg min-w-[18rem] ${theme === 'dark' || theme === "system" ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} font-medium`}>
                        <DropdownMenuItem
                            className={`hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} py-[0.6rem] text-base flex gap-2`}
                            onClick={() => alert("Add Module")}>
                            <Rows3 className='h-5 text-gray-500'/> <span>Create module </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={`hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} py-[0.6rem] text-base flex gap-2`}
                            onClick={() => alert("Add Module")}>
                            <Link className='h-5 text-gray-500'/> <span>Add a link</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={`hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} py-[0.6rem] text-base flex gap-2`}
                            onClick={() => alert("Add Module")}>
                            <ArrowUpFromLine className='h-5 text-gray-500'/> <span>Upload</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

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
                        className={`hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} flex items-center gap-2`}
                        onClick={() => setTheme("light")}>
                        <Sun className="h-4 w-4"/> Light
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className={`hover:${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} flex items-center gap-2`}
                        onClick={() => setTheme("dark")}>
                        <Moon className="h-4 w-4"/> Dark
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </nav>
    );
}

export default Navbar;