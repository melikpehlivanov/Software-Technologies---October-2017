const Anime = require('../models/Anime');

module.exports = {
	index: (req, res) => {
        Anime.find().then(animes => {
            res.render('anime/index', {'animes': animes})
        });
	},
	createGet: (req, res) => {
        res.render('anime/create');
	},
	createPost: (req, res) => {
        let animeArgs = req.body;
        if (!animeArgs.rating || !animeArgs.name || !animeArgs.description || !animeArgs.watched){
            res.redirect('/'); 
            return;
        }
        Anime.create(animeArgs).then(anime => {
            res.redirect('/'); 
        });
    },
	deleteGet: (req, res) => {
        let id = req.params.id;
        Anime.findById(id).then(anime => {
            if(!anime){
                res.redirect('/');
                return;
            }
            res.render('anime/delete', anime);
        })
	},
	deletePost: (req, res) => {
        let id = req.params.id;
        Anime.findByIdAndRemove(id).then(anime => {
            res.redirect('/');
        })
    }
};