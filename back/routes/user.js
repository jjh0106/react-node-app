const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    
});

router.post('/', (req, res) => {

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