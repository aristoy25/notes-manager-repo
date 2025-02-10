import axios from 'axios';

const getProjects = async () => {
    try {
    const response = await axios.get('http://localhost:3000/notes');
    return response.data;       
    } catch (error) {
        console.log(error);
    }
}

const addProjectAxios = async ( project ) => {
    try {
        const response = await axios.post('http://localhost:3000/notes', project);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export { getProjects, addProjectAxios };