const bcrypt = require('bcrypt-nodejs');
module.exports = {
    attributes: {
        UserId: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        FirstName: {
            type: 'string',
            size: 250,
        },
        LastName: {
            type: 'string',
            size: 250,
        },
        Email : {
            type: 'string',
            size: 150,
        },
       
        Password : {
            type: 'string',
            size: 100,
        },
        Employees: {
            collection: 'Employees',
            via: 'UserId'
        }

    },
    customToJSON: function () {
        return this.toObject()
    },
    beforeCreate: function (user, cb) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.Password, salt, null, function (err, hash) {
                if (err) return cb(err);
                user.Password = hash;
                return cb();
            });
        });

    },
};