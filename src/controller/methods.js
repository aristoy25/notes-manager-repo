import axios from 'axios';

const getProjects = async () => {
    try {
    const response = await axios.get('http://localhost:3000/notes');
    return response.data;       
    } catch (error) {
        console.log(error);
    }
};

const getTasks = async () => {
    try {
    const response = await axios.get('http://localhost:3000/tasks');
    return response.data;       
    } catch (error) {
        console.log(error);
    }
};

const addProjectAxios = async ( project ) => {
    try {
        const response = await axios.post('http://localhost:3000/notes', project);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const deleteProjectAxios = async ( id ) => {
    try {
        const response = await axios.delete(`http://localhost:3000/notes/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const addTaskAxios = async ( task ) => {
    try {
        const response = await axios.post('http://localhost:3000/tasks', task);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const deleteTaskAxios = async ( id ) => {
    try {
        const response = await axios.delete(`http://localhost:3000/tasks/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export { getProjects, getTasks, addProjectAxios, addTaskAxios, deleteTaskAxios, deleteProjectAxios };