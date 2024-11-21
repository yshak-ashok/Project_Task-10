'user strict';
console.log('user');

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
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
        },
        {
            tableName: 'user',
            timestamps: true,
        },
    );

    user.associate = function (models) {
        // Define the one-to-one relationship
        user.hasOne(models.post, {
            foreignKey: 'userId', // Foreign key in the post table
            as: 'post', // Alias for the association
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };

    return user;
};
