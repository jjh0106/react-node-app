const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models');
const passport = require('passport');
const { isLoggedIn } = require('./middleware');

router.get('/', isLoggedIn, (req, res) => {
    const user = Object.assign({}, req.user.toJSON());
    delete user.password;
    return res.json(user);
});

// 회원가입 - /api/user
router.post('/', async(req, res, next) => {
    try {
        const { nickname, userId, password } = req.body;
        console.log("front data============>", {nickname, userId, password});
        const exUser = await db.User.findOne({
            where: {
                userId: userId
            },
        });
        if( exUser ){
            return res.status(403).send('이미 사용중인 아이디입니다.'); 
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await db.User.create({
            nickname: nickname,
            userId: userId,
            password: hashedPassword,
        });
        console.log("newUser============>", newUser);
        return res.status(200).json(newUser);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.get('/:id', async(req, res, next) => { // 다른 사람의 정보를 가져오는 것. req.params.id
    try {
        const user = await db.User.findOne({
            where: {
                id: parseInt(req.params.id, 10),
            },
            include: [{
                model: db.Post,
                as: 'Posts',
                attributes: ['id'],
            }, {
                model: db.User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: db.User,
                as: 'Followers',
                attributes: ['id'],
            }],
            attributes: ['id', 'nickname'],
        });

        const jsonUser = user.toJSON();
        jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
        jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
        jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
        res.json(jsonUser);
    } catch(e) {
        console.error(e);
        next(e);
    }
});

router.get('/:id/posts', async(req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            where: {
                userId: parseInt(req.params.id, 10),
                RetweetId: null, 
            },
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
            }]
        });
        res.json(posts);
    } catch(e) {
        console.error(e);
        next(e);
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => { // done(서버에러, 성공유무, 로직에러)
        if( err ){ // 서버에러
            console.error(err);
            return next(err);
        }
        if( info ){ // 로직에러
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginError) => {
            if( loginError ){
                return next(loginError);
            }
            const fullUser = await db.User.findOne({
                where: { id: user.id },
                include: [{
                    model: db.Post,
                    as: 'Posts',
                    attributes: ['id'],
                }, {
                    model: db.User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: db.User,
                    as: 'Followers',
                    attributes: ['id'],
                }],
                attributes: ['id', 'nickname', 'userId'],
            })
            return res.json(fullUser);
        });
    })(req, res, next);
});

router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('logout'); 
});

router.get('/:id/followings', isLoggedIn, async(req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: { id: parseInt(req.params.id, 10) },
        });
        const followings = await user.getFollowings({
            attributes: ['id', 'nickname'],
        });
        res.json(followings);
    } catch(e) {
        console.error(e);
        next(e);
    }
});

router.get('/:id/followers', isLoggedIn, async(req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: { id: parseInt(req.params.id, 10) },
        });
        const followers = await user.getFollowers({
            attributes: ['id', 'nickname'],
        });
        res.json(followers);
    } catch(e) {
        console.error(e);
        next(e);
    }
});

router.delete('/:id/follower', isLoggedIn, async(req, res, next) => {
    try {
        const me = await db.User.findOne({
            where: { id: req.user.id },
        });
        await me.removeFollower(req.params.id);
        res.send(req.params.id);
    } catch(e) {
        console.error(e);
        next(e);
    }
});

router.post('/:id/follow', async(req, res) => {
    try {
        const me = await db.User.findOne({
            where: { id: req.user.id }, // 내 아이디
        });
        await me.addFollowing(req.params.id); // 프론트에서 받아온 팔로잉할 사람의 아이디
        res.send(req.params.id);
    } catch(e) {
        console.error(e);
        next(e); 
    }
});

router.delete('/:id/follow', isLoggedIn, async(req, res) => {
    try {
        const me = await db.User.findOne({
            where: { id: req.user.id }, // 내 아이디
        });
        await me.removeFollowing(req.params.id); // 프론트에서 받아온 팔로잉할 사람의 아이디
        res.send(req.params.id);
    } catch(e) {
        console.error(e);
        next(e); 
    }
});

router.patch('/nickname', isLoggedIn, async(req, res, next) => {
    try {
        await db.User.update({
            nickname: req.body.nickname,
        }, {
            where: { id: req.user.id }
        });
        res.send(req.body.nickname);
    } catch(e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;