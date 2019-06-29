module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        charset: 'utf8mb4', // 한글+이모티콘
        collate: 'utf8mb4_general_ci',
    });

    // 관계를 정의
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsTo(db.Post, { as: 'Retweet' }); // 리트윗
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    };

    return Post;
};

// user는 많은 post를 가지고 있다 -> user hasMany post
// post는 user에 속해 있다. -> post belongsTo user

// belongsTo가 있는 테이블에 다른 테이블의 id를 저장한다 (Post테이블에 UserId 저장)