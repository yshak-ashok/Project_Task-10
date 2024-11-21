'use strict';
console.log('post');

module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define(
        'post',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
        },
        {
            tableName: 'post',
            timestamps: true,
        },
    );

    post.associate = function (models) {
        // Define the one-to-one relationship
        post.belongsTo(models.user, {
            foreignKey: 'userId', // Foreign key in the post table
            as: 'user', // Alias for the association
        });
    };

    return post;
};
