const express = require('express');
const router = express.Router();
const Comment = require('../schema/Comment');

// GET all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific comment by ID
router.get('/:id', getComment, (req, res) => {
    res.json(res.comment);
});

// CREATE a new comment
router.post('/', async (req, res) => {
    const comment = new Comment({
        post: req.body.post,
        author: req.body.author,
        content: req.body.content
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a comment
router.delete('/:id', getComment, async (req, res) => {
    try {
        await res.comment.remove();
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get comment by ID
async function getComment(req, res, next) {
    let comment;
    try {
        comment = await Comment.findById(req.params.id);
        if (comment == null) {
            return res.status(404).json({ message: 'Cannot find comment' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.comment = comment;
    next();
}

module.exports = router;
