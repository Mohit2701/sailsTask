let bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

module.exports = {
    show: async function (req, res) {
        try {
            
            res.view('reg', {
                layout: 'layout',
            });
        } catch (err) {
            sails.log('Error in reg', err);
        }
    },
    register: async function (req, res) {
        try {
            var data = req.body;
            var newEmpId = data.Organization + '_' + data.employeeID;
            var Employee = await Employees.findOne({ EmployeeID: newEmpId });
            var users = await User.findOne({ Email: data.email });
            if (Employee) {
                return res.json({ "error": "EmployeeID Already Exist" });
            } else if (users) {
                return res.json({ "error": "Email ID Already Exist" });
            } else {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(data.password, salt, null, async function (err, hash) {
                        if (err) {
                            return res.json({ "error": "Something went wrog plz try after some time" });
                        }

                        var newdata = await User.create({
                            FirstName: data.FirstName,
                            LastName: data.LastName,
                            Email: data.email,
                            Password: hash
                        });
                        if (newdata) {
                            var newdata = await Employees.create({
                                EmployeeID: newEmpId,
                                EmpID: data.employeeID,
                                UserId: newdata.UserId,
                                Organization: data.Organization,
                            });
                        }
                        return res.json({ "success": true });
                    });
                });
            }

        } catch (err) {
            sails.log('Error in register', err);
        }
    },
    loginShow: async function (req, res) {
        try {
            res.view('login', {
                layout: 'layout',
            });
        } catch (err) {
            sails.log('Error in login ', err);
        }
    },
    login: async function (req, res) {
        try {

            passport.authenticate('local', function (er, user, info) {
                if ((er) || (!user)) {
                    sails.log('er', er);
                    return res.json({ "loginError": info.message });
                } else {
                    req.logIn(user, function (err) {
                        if (err) {
                            /* 
                            req.addFlash('loginError', info.message);
                            res.redirect('/') */
                            sails.log('errrrr', err);
                            return res.json({ "loginError": info.message });
                        };
                        /* res.redirect('/dashboard'); */
                        return res.json({ "success": true});
                    })
                }
            })(req, res);
        } catch (err) {
            sails.log('Error in login post', err);
        }
    },

    // checkCurrentPassword: async function (req, res) {
    //     try {

    //         User.findOne({ UserId: req.body.id }).exec(function (err, user) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             bcrypt.compare(req.body.OldPassword, user.Password, async function (err, response) {
    //                 if (response) {
    //                     return res.json({ "success": true, });
    //                 } else {
    //                     return res.json({ "success": false, });
    //                 }
    //             })
    //         });

    //     } catch (err) {
    //         sails.log('Error in checkCurrentPassword', err);
    //     }
    // },

    // changeCurrentPassword: async function (req, res) {
    //     try {

    //         let oldPassword = req.body.OldPassword;
    //         let confirmPassword = req.body.confirmPassword;
    //         /*   if (req.user !== undefined) { */
    //         User.findOne({ UserId: req.body.cid }).exec(function (err, user) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             bcrypt.compare(oldPassword, user.Password, async function (err, response) {
    //                 if (response) {
    //                     bcrypt.genSalt(10, function (err, salt) {
    //                         bcrypt.hash(confirmPassword, salt, null, async function (err, hash) {
    //                             if (err) {
    //                                 sails.log("error while encrypting password");
    //                             }
    //                             await User.update({ UserId: req.body.cid })
    //                                 .set({ Password: hash });
    //                             return res.json({ "success": true });
    //                         });
    //                     });

    //                 } else {
    //                     return res.json({ "success": false });
    //                 }
    //             })
    //         });
    //     } catch (err) {
    //         sails.log('Error in changeCurrentPassword', err);
    //     }
    // },


    // getAccessData: async function (req, res) {
    //     try { 
    //         if (req.user !== undefined) {
    //             var user = await User.findOne({ UserId: req.user.id });
    //             CheckAccess.checkAccessRoutes(user.AccessGroup, function (err, data) {
    //                 var array = {};
    //                 if (user.AccessGroup !==1) {
    //                     for (const key in data) {
    //                         if (Object.hasOwnProperty.call(data, key)) {
    //                             const element = data[key];
    //                             let name = element.Functionality;
    //                             array[name] = element.Access;
    //                         }
    //                     }
    //                 }else{
    //                     array = data;
    //                 }

    //                 return res.json({ "data": array });
    //             });
    //         } else {
    //             return res.redirect('/');
    //         }
    //     } catch (err) {
    //         sails.log('Error in mailsend', err);
    //     }
    // },        
    logout: function (req, res) {
        req.session.destroy();
        return res.redirect('/');
    },
};
