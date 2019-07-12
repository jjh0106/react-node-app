exports.isLoggedIn = (req, res, next) => {
    if( req.isAuthenticated() ){
        next();
    } else {
        res.status(401).send('로그인 해주세요.');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if( !req.isAuthenticated() ){
        next();
    } else {
        res.status(401).send('로그인한 사용자는 접근할 수 없습니다.');
    }
};