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
        body: {
            type: DataTypes.TEXT
        },
        userId: {
            type: DataTypes.INTEGER
        },
    }, {
        tableName: 'Posts',
        timestamps: false,
    });

    Post.associate = (models) => {
        Post.belongsTo(models.User, {foreignKey: 'userId', as: "user"});
    };

    return Post;
};