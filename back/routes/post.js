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
            UserId: req.user.id
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
                attributes: ['id', 'nickname'],
            }]
        });
        return res.json(fullPost);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.post('/images', (req, res) => {

});

router.get('/:id/comments', async(req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if( !post ){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }

        const comments = await db.Comment.findAll({
            where: {
                PostId: req.params.id,
            },
            order: [['createdAt', 'ASC']],
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }]
        });
        return res.json(comments);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.post('/:id/comment', async(req, res, next) => {
    try {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", req.user);
        if( !req.user ){
            return res.status(401).send('로그인이 필요합니다.');
        }
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if( !post ){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const newComment = db.Comment.create({
            PostId: post.id,
            UserId: req.user.id,
            content: req.body.content,
        });
        await post.addComment(newComment.id);
        const comment = await db.Comment.findOne({
            where: {
                id: newComment.id
            },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }]
        });
        return res.json(comment);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;