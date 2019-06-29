const express = require('express');
const db = require('./models');

const app = express();
db.sequelize.sync();

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 경로.
// routes

app.listen(3065, () => {
    console.log('server is running on http://localhost:3065');
});