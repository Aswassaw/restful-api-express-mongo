module.exports = (app) => {
    const router = require('express').Router();
    const posts = require('../controllers/post.controller');

    router.get('/', posts.findAll);
    router.post('/', posts.create);
    router.get('/:id', posts.findOne);
    router.put('/:id', posts.update);
    router.delete('/:id', posts.delete);

    app.use('/api/posts', router);
} 