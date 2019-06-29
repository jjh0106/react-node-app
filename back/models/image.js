module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    },
    {
        charset: 'utf8', // 한글+이모티콘
        collate: 'utf8_general_ci',
    });

    // 관계를 정의
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };

    return Image;
};

// post는 많은 image를 가지고 있다 -> post는 hasMany image
// image는 post에 속해 있다. -> image belongsTo post

// belongsTo가 있는 테이블에 다른 테이블의 id를 저장한다 (Image테이블에 postId 저장)