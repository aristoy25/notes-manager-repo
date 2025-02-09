export const validateNote = (req, res, next) => {
    const { title, content, id } = req.body;
    
    if (!title || !content || !id) {
        return res.status(400).send('Note must have a title, content, and id');
    }
    if (typeof title !== 'string' || typeof content !== 'string' || typeof id !== 'string') {
        return res.status(400).send('Title, content, and id must be strings');
    }
    if (title.trim().length === 0 || content.trim().length === 0 || id.trim().length === 0) {
        return res.status(400).send('Title, content, and id cannot be empty');
    }
    if (title.length > 30) {
        return res.status(400).send('Title must be less than 30 characters');
    }
    if (content.length > 1000) {
        return res.status(400).send('Content must be less than 1000 characters');
    }
    
    next();
};