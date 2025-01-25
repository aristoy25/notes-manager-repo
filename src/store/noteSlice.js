import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
    name: 'notes',
    initialState: {
        selectedProjectId: undefined,
        projects: [],
        tasks: []
    },
    reducers: {
        addTask(state,action) {
            const taskId = Math.random();
            const newTask = {
                text: action.payload.text,
                projectId: state.selectedProjectId,
                id: taskId
            }
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
            const projectId = Math.random();
            const newProject = {
                id: projectId,
                ...action.payload
            }
            state.projects.unshift(newProject);
        },
        deleteProject(state,action) {
            state.projects = state.projects.filter( project => project.id !== action.payload.id);
            state.selectedProjectId = undefined;
        }
    }
});

export const notesActions = noteSlice.actions;

export default noteSlice;