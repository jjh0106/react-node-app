const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models');


router.get('/', (req, res) => {
    
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

router.post('/login', (req, res) => {

});

router.post('/logout', (req, res) => {

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