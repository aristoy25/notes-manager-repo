export const validateNote = (req, res, next) => {
    const { title, description, id } = req.body;
    
    if (!title || !description || !id) {
        return res.status(400).send('Note must have a title, description, and id');
    }
    if (typeof title !== 'string' || typeof description !== 'string' || typeof id !== 'string') {
        return res.status(400).send('Title, description, and id must be strings');
    }
    if (title.trim().length === 0 || description.trim().length === 0 || id.trim().length === 0) {
        return res.status(400).send('Title, description, and id cannot be empty');
    }
    if (title.length > 30) {
        return res.status(400).send('Title must be less than 30 characters');
    }
    if (description.length > 1000) {
        return res.status(400).send('description must be less than 1000 characters');
    }
    
    next();
};

export const validateTask = (req, res, next) => {
    const { text, projectId, id } = req.body;
    
    if (!text || !projectId || !id) {
        return res.status(400).send('Task must have text, projectId, and id');
    }
    if (text.trim().length === 0) {
        return res.status(400).send('Text, projectId, and id cannot be empty');
    }
    if (text.length > 100) {
        return res.status(400).send('Text must be less than 100 characters');
    }
    
    next();
};