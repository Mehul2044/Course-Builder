import Navbar from "@/src/components/Navbar.jsx";
import {useSelector} from "react-redux";
import EmptyContent from "@/src/components/EmptyContent.jsx";
import ModuleRender from "@/src/components/ModuleRender.jsx";

function App() {
    const data = useSelector(state => state.module.modules);

    return <>
        <Navbar/>
        {data.length === 0 ? <EmptyContent/> : <ModuleRender/>}
    </>
}

export default App;
