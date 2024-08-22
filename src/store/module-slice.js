// src/store/module-slice.js
import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';

const list = [
    {
        id: uuidv4(),
        title: "Module 1",
        noOfItems: 2,
        items: [
            {id: uuidv4(), name: "Item 1", type: "link", url: "http://example.com/1"},
            {id: uuidv4(), name: "Item 2", type: "file", url: "http://example.com/2"},
        ],
    },
    {
        id: uuidv4(),
        title: "Module 2",
        noOfItems: 3,
        items: [
            {id: uuidv4(), name: "Item 3", type: "link", url: "http://example.com/3"},
            {id: uuidv4(), name: "Item 4", type: "file", url: "http://example.com/4"},
            {id: uuidv4(), name: "Item 5", type: "link", url: "http://example.com/5"},
        ],
    },
    {
        id: uuidv4(),
        title: "Module 3",
        noOfItems: 2,
        items: [
            {id: uuidv4(), name: "Item 6", type: "file", url: "http://example.com/6"},
            {id: uuidv4(), name: "Item 7", type: "link", url: "http://example.com/7"},
        ],
    },
]

const moduleSlice = createSlice({
    name: "module",
    initialState: {modules: list},
    reducers: {
        addModule: (state, action) => {
            const newModule = {
                id: uuidv4(),
                title: action.payload.title,
                noOfItems: 0,
                items: [],
            };
            state.modules.push(newModule);
        },
        updateModule: (state, action) => {
            const {id, title} = action.payload;
            const existingModule = state.modules.find(module => module.id === id);
            if (existingModule) {
                existingModule.title = title;
            }
        },
        removeModule: (state, action) => {
            state.modules = state.modules.filter(module => module.id !== action.payload.id);
        },
        addItem: (state, action) => {
            const {moduleId, name, type, url} = action.payload;
            const module = state.modules.find(module => module.id === moduleId);
            if (module) {
                const newItem = {
                    id: uuidv4(),
                    name,
                    type,
                    url,
                };
                module.items.push(newItem);
                module.noOfItems += 1;
            }
        },
        updateItem: (state, action) => {
            const {moduleId, itemId, name, type, url} = action.payload;
            const module = state.modules.find(module => module.id === moduleId);
            if (module) {
                const existingItem = module.items.find(item => item.id === itemId);
                if (existingItem) {
                    existingItem.name = name;
                    existingItem.type = type;
                    existingItem.url = url;
                }
            }
        },
        removeItem: (state, action) => {
            const {moduleId, itemId} = action.payload;
            const module = state.modules.find(module => module.id === moduleId);
            if (module) {
                module.items = module.items.filter(item => item.id !== itemId);
                module.noOfItems -= 1;
            }
        },
    },
});

export const moduleActions = moduleSlice.actions;
export default moduleSlice;