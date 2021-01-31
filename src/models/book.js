module.exports = (connection, DataTypes) => {
    const schema = {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Title field cannot be empty.'
                }
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Author field cannot be empty.'
                }
            }
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Genre field cannot be empty.'
                }
            }
        },
        ISBN: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'ISBN field cannot be empty.'
                }
            }
        }
    };

    const BookModel = connection.define('Book', schema);
    return BookModel;
};
