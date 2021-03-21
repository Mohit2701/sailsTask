const bcrypt = require('bcrypt-nodejs');
module.exports = {
    attributes: {
        name : {
            type: 'string',
            size: 150,
        },
       
        price : {
            type: 'float',
        },
        description: {
            type: 'text',
        },
        view: {
            type: 'integer',
        },
        active: {
            type: 'boolean',
            defaultsTo: true
        },
    },
     


};