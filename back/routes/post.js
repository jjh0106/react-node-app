const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const db = require('../models');
const { isLoggedIn } = require('./middleware');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            done(null, basename + new Date().valueOf() + ext);
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
});

// 게시글 작성
// 폼데이터 파일 -> req.file(s)
// 폼데이터 일반 값 -> req.body
router.post('/', isLoggedIn, upload.none(), async(req, res, next) => {
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
        if( req.body.image ){
            if( Array.isArray(req.body.image) ){ // 이미지 주소를 여러 개 올리면 [주소1, 주소2, 주소3]
                const images = await Promise.all(req.body.image.map((image) => { // 동시에 배열의 쿼리 작업 수행 시 사용
                    return db.Image.create({ src: image });
                }))
                await newPost.addImages(images);
            } else { // 하나만 올리면 주소1
                const image = await db.Image.create({ src: req.body.image });
                await newPost.addImage(image);
            }
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
            }, {
                model: db.Image,
            }]
        });
        return res.json(fullPost);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.post('/images', upload.array('image'), (req, res) => {
    res.json(req.files.map(v => v.filename));
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

router.post('/:id/comment', isLoggedIn, async(req, res, next) => {
    try {
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

router.post('/:id/like', isLoggedIn, async(req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if( !post ){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        await post.addLiker(req.user.id); // post models의 db.Post.belongsToMany(db.User ~ , as: 'Likers')의 관계를 보고 시퀄라이즈가 만들어 준다.
        res.json({ userId: req.user.id });
    } catch(e) {
        console.error(e);
        next(e);
    }
});

router.delete('/:id/like', isLoggedIn, async(req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if( !post ){
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        await post.removeLiker(req.user.id);
        res.json({ userId: req.user.id });
    } catch(e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;