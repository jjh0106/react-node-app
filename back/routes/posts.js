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
            }],
            order: [['createdAt', 'DESC']]
        })
    } catch(e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;