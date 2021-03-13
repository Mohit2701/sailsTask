module.exports = {
    attributes: {
        
        EmployeeID : {
            type: 'string',
            size: 100,
        },
        EmpID: {
            type: 'string',
            size: 100,
        },
        UserId: {
            model: 'User'
        },
        Organization : {
            type: 'string',
            size: 250,
        },
        
    }
};