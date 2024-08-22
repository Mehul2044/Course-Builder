import {configureStore} from "@reduxjs/toolkit";
import moduleSlice from "@/src/store/module-slice.js";

const store = configureStore({
    reducer: {module: moduleSlice.reducer}
});

export default store;