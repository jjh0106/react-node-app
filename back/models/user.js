module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    // 관계를 정의
    User.associate = (db) => {
        db.User.hasMany(db.Post, { as: 'Posts' });
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' }); 
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });
    };

    return User;
};

// 같은 테이블의 n:m의 관계에서는 두번 적어주고 as로 구분.
// belongsToMany는 as를 달아주는 것이 좋다.