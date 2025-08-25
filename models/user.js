export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'Users',
        timestamps: true,
    });

    User.associate = (models) => {
        User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
        User.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' });

        User.belongsToMany(models.User, {
            through: models.Follow,
            as: 'Following',
            foreignKey: 'followerId',
            otherKey: 'followingId',
        });

        User.belongsToMany(models.User, {
            through: models.Follow,
            as: 'Followers',
            foreignKey: 'followingId',
            otherKey: 'followerId',
        });
    };

    return User;
};
