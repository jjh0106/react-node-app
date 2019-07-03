const passport = require('passport');
const db = require('../models');
const local = require('./local');

module.exports = () => {
    // 로그인 시 서버 쪽에 [{ id: 3, cookie: 'adf~~' }] 저장하고 프론트에는 쿠키를 보내준다.
    // 보내준 쿠키는 로그인 정보가 필요할 때마다 사용하여 id와 매칭 시킴.
    passport.serializeUser((user, done) => { 
        return done(null, user.id);
    });

    // 매칭시킨 id를 토대로 유저 정보를 가져와 request.user에 저장한다.
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await db.User.findOne({
                where: { id },
            });
            return done(null, user); // request.user
        } catch(e) {
            console.error(e);
            return done(e);
        }
    });

    local();
};

// 프론트가 cookie를 서버에 보낸다. 
// 서버는 쿠키파서, 익스프레스세션으로 쿠키를 검사 후, id를 찾는다.
// id로 deserializeUser를 실행하여 찾은 사용자 정보를 user에 담는다.
// 프론트가 요청 보낼 때마다 serializeUser는 실행된다.
// 그래서 실무에서는 deserializeUser의 결과물을 캐싱한다.
