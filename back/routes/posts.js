const express = require('express');
const router = express.Router();
const db = require('../models');

// 게시글 가져오기
router.get('/', async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.Image,
            }, {
                model: db.User,
                through: 'Liker',
                as: 'Likers',
                attributes: ['id'],
            }],
            order: [['createdAt', 'DESC']]
        })
        return res.json(posts);
    } catch(e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;