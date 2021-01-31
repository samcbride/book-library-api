module.exports = (connection, DataTypes) => {
    const schema = {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Name field cannot be empty.'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Email field cannot be empty.'
                },
                isEmail: true,
                isEmail: {
                    msg: 'Must be a valid email format.'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Password field cannot be empty.'
                },
                min: value => {
                    if (value.length < 9) {
                        throw new Error('The password must be at least 9 characters.')
                    }
                }
               
            } 
        }
    };

    const ReaderModel = connection.define('Reader', schema);
    return ReaderModel;
};