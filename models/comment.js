export default (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        tableName: 'Comments',
        timestamps: true,
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        Comment.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
        Comment.hasMany(models.CommentLike, { foreignKey: 'commentId', as: 'likes' });
    };

    return Comment;
};
