const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models');
const passport = require('passport');

router.get('/', (req, res) => {
    if(!req.user){
        return res.status(401).send('로그인이 필요합니다.');
    }
    const user = Object.assign({}, req.user.toJSON());
    delete user.password;
    return res.json(user);
});

// 회원가입 - /api/user
router.post('/', async (req, res, next) => {
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
        console.log(e);
        return next(e);
    }
});

router.get('/:id', (req, res) => { // 다른 사람의 정보를 가져오는 것. req.params.id

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

router.get('/:id/follow', (req, res) => {

});

router.post('/:id/follow', (req, res) => {

});

router.delete('/:id/follow', (req, res) => {

});

router.delete('/:id/follower', (req, res) => {

});

module.exports = router;