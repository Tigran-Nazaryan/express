export default (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
        },
    }, {
        tableName: 'Posts',
        timestamps: false,
    });

    Post.associate = (models) => {
        Post.belongsTo(models.User, {foreignKey: 'userId', as: "user"});
        Post.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' });
    };

    return Post;
};