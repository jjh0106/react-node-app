const express = require('express');
const router = express.Router();
const db = require('../models');

// 게시글 작성
router.post('/', async (req, res, next) => {
    try {
        const { content } = req.body;
        const hashtags = content.match(/#[^\s]+/g);
        const newPost = await db.Post.create({
            content,
            UserId: req.body.id
        });
        if( hashtags ){
            const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({ // 없으면 넣고 있으면 아무 것도 안한다.
                where: {
                    name: tag.slice(1).toLowerCase()
                }
            })))
            await newPost.addHashtags(result.map(r => r[0]));
        }

        // Post 테이블의 UserId에 매칭되는 User 정보를 JOIN 해줘야 하는데 두 가지 방법이 있다.
        // 1.
        // const User = await newPost.getUser();
        // newPost.User = User;
        // res.json(newPost);

        // 2.
        const fullPost = await db.Post.findOne({
            where: { id: newPost.id },
            include: [{
                model: db.User,
            }]
        });
        res.json(fullPost);
    } catch(e) {
        console.log(e);
        next(e);
    }
});

router.post('/images', (req, res) => {

});

module.exports = router;