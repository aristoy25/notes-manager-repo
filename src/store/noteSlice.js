import { createSlice } from "@reduxjs/toolkit";
import { addTaskAxios } from "../controller/methods";

const noteSlice = createSlice({
    name: 'notes',
    initialState: {
        selectedProjectId: undefined,
        projects: [],
        tasks: []
    },
    reducers: {
        addTask(state,action) {
            const taskId = action.payload.id ? action.payload.id : Math.random().toFixed(5).toString().split('.')[1];
            const newTask = {
                text: action.payload.text,
                projectId: action.payload.projectId ? action.payload.projectId : state.selectedProjectId,
                id: taskId
            }
            !action.payload.id && addTaskAxios(newTask);
            state.tasks.unshift(newTask);

        },
        deleteTask(state,action) {
            state.tasks = state.tasks.filter( task => task.id !== action.payload.id);
        },
        selectProject(state,action) {
            state.selectedProjectId = action.payload.id;
        },
        startAddProject(state) {
            state.selectedProjectId = null;
        },
        cancelAddProject(state) {
            state.selectedProjectId = undefined;
        },
        addProject(state,action) {
            const newNote = {
                ...action.payload,
            }
            state.projects.unshift(newNote);
        },
        deleteProject(state,action) {
            state.projects = state.projects.filter( project => project.id !== action.payload.id);
            state.selectedProjectId = undefined;
        }
    }
});

export const notesActions = noteSlice.actions;

export default noteSlice;