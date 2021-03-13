module.exports = {
    show: async function (req, res) {
        try {
            if (req.user !== undefined) {
                var users = await User.findOne({ UserId: req.user.id });
                var data = await Employees.find().populate('UserId');
              
                res.view('dashboard', {
                    layout: 'layout',
                    user: users,
                    data: data
                });
            } else {
                res.redirect('/');
            }
           
        } catch (err) {
            sails.log('Error in Dashboard', err);
        }
    },
}