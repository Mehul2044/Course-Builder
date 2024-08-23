import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux";
import store from "./store/index.js";
import {ThemeProvider} from "@/components/theme-provider.jsx";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <DndProvider backend={HTML5Backend}>
            <ThemeProvider defaultTheme={"light"} storageKey={"vite-ui-theme"}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ThemeProvider>
        </DndProvider>
    </StrictMode>
)
