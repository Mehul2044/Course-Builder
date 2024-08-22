import {Button} from "@/components/ui/button.jsx";
// import {useDispatch, useSelector} from "react-redux";
// import {moduleActions} from "@/src/store/module-slice.js";

function App() {
    // const dispatch = useDispatch();
    //
    // const onClick = () => {
    //     dispatch(moduleActions.addModule({title: "Module 10"}));
    // }
    // const data = useSelector(state => state.module.modules);
    // console.log(data.length);

    return <>
        <p className={"text-4xl"}>Hello World!</p>
        <Button>Click Me</Button>
        {/*<Button onClick={onClick}>Click Me</Button>*/}
    </>
}

export default App;
