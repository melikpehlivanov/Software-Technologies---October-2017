const Report = require('../models/Report');

module.exports = {
    index: (req, res) => {
        Report.find().then(reports => {
            res.render('report/index', {'reports': reports})
        });
    },
    createGet: (req, res) => {
        res.render('report/create');
    },
    createPost: (req, res) => {
        let reportArgs = req.body;
        if (!reportArgs.status || !reportArgs.message || !reportArgs.origin){
            res.redirect('/'); 
            return;
        }
        Report.create(reportArgs).then(report => {
            res.redirect('/'); 
        })
    },
    detailsGet: (req, res) => {
        let id = req.params.id;

        Report.findById(id).then(report => {

            res.render('report/details', report)

        })
    },
    deleteGet: (req, res) => {
        let id = req.params.id;
        Report.findById(id).then(report => {
            if(!report){
                res.redirect('/');
                return;
            }
            res.render('report/delete', report);
        })
    },
    deletePost: (req, res) => {
        let id = req.params.id;
        Report.findByIdAndRemove(id).then(report => {
            res.redirect('/');
        })
    }
};