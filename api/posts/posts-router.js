// implement your posts router here
const Posts = require('./posts-model');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: "The posts information could not be retrieved" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        } else {
            res.json(post);
        }
    } catch (err) {
        res.status(500).json({ message: "The post information could not be retrieved" });
    }
});

router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.contents) {
            res.status(400).json({ message: "Please provide title and contents for the post" });
        } else {
            const newPost = await Posts.insert(req.body);
            res.status(201).json({ id: newPost, ...req.body});
        }
    } catch (err) {
        res.status(500).json({ message: "There was an error while saving the post to the database" });
    }
});

// router.put('/:id', async (req, res) => {
//     try {
        
//     } catch (err) {
//         res.status(500).json({ message: "The post information could not be modified" });
//     }
// });

router.delete('/:id', async (req, res) => {
    const deletedPost = await Posts.remove(req.params.id);
    try {
        if (!deletedPost) {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        } else {
            res.json(deletedPost);
        }
    } catch (err) {
        res.status(500).json({ message: "The post could not be removed" });
    }
});

router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await Posts.findPostComments(req.params.id);
        if (!comments) {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        } else {
            res.json(comments);
        }
    } catch (err) {
        res.status(500).json({ message: "The comments information could not be retrieved" });
    }
});

module.exports = router;