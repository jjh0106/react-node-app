const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/:tag', async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            include: [{
                model: db.Hashtag,
                // 프론트에서 보내준 태그는 한글이거나 특수문자일 경우 uriComponent로 바뀌기 때문에 이렇게 처리해줘야 함.
                where: { name: decodeURIComponent(req.params.tag) }, 
            }, {
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.Image,
            }, {
                model: db.User,
                through: 'Liker',
                as: 'Likers',
                attributes: ['id'],
            }]
        });
        res.json(posts);
    } catch(e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;