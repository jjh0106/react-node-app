const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/:tag', async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            include: [{
                model: db.Hashtag,
                where: { name: req.params.name },
            }]
        });
        res.json(posts);
    } catch(e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;