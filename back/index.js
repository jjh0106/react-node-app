const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const db = require('./models');
const passportConfig = require('./passport');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
// const commentAPIRouter = require('./routes/comment');
const hashtagAPIRouter = require('./routes/hashtag');
// const imageAPIRouter = require('./routes/image');

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
app.use(express.json()); // json형식의 body를 처리
app.use(express.urlencoded({ extended: true })); // form으로 넘어온 데이터 처리
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false, // 매번 세션을 강제 저장
    saveUninitialized: false, // 빈 값도 저장
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true, // 자바스크립트에서 쿠키에 접근을 못하게
        secure: false, // https 사용 시 true로
    },
    name: 'rnack',
}));
app.use(passport.initialize());
app.use(passport.session()); // expressSession보다 아래에 작성

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 경로.
// routes
app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);
// app.use('/api/image', imageAPIRouter);
app.use('/api/hashtag', hashtagAPIRouter);
// app.use('/api/comment', commentAPIRouter);

app.listen(3065, () => {
    console.log('server is running on http://localhost:3065');
});