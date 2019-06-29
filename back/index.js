const express = require('express');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const commentAPIRouter = require('./routes/comment');
const hashtagAPIRouter = require('./routes/hashtag');
const imageAPIRouter = require('./routes/image');
const app = express();
db.sequelize.sync();

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 경로.
// routes
app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/posts', postsAPIRouter);
app.use('/api/image', imageAPIRouter);
app.use('/api/hashtag', hashtagAPIRouter);
app.use('/api/comment', commentAPIRouter);

app.listen(3065, () => {
    console.log('server is running on http://localhost:3065');
});