const Article = require('mongoose').model('Article');

function validateArticles(articleArgs, req) {
    let errorMsg = '';
    if(!req.isAuthenticated()){
        errorMsg = 'You should be logged in order to make/edit/delete/update articles!';
    } else if (!articleArgs.title){
        errorMsg = 'Invalid title!';
    } else if (!articleArgs.content){
        errorMsg = 'Invalid content!';
    }
    return errorMsg;
}

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },

    createPost: (req, res) => {
        let articleArgs = req.body;

        let errorMsg = validateArticles(articleArgs, req);

        if (errorMsg){
            res.render('article/create', {error: errorMsg});
            return;
        }

        articleArgs.author = req.user.id;
        Article.create(articleArgs).then(article => {
            req.user.articles.push(article.id);
            req.user.save(err => {
                if (err){
                    res.redirect('/', {error: err.message});
                } else {
                    res.redirect('/');
                }
            })
        })
    },

    details: (req, res) => {
        let id = req.params.id;

        Article.findById(id).populate('author').then(article => {
            res.render('article/details', article)
        })
    },

    editGet: (req, res) => {
        let id = req.params.id;

        if (!req.isAuthenticated()){
            let returnUr1 = `/article/edit/${id}`;
            req.session.returnUr1 = returnUr1;

            res.redirect('/user/login');
            return;
        }
        Article.findById(id).then(article => {
            req.user.isInRole('Admin').then(isAdmin => {
                if (!isAdmin && !req.user.isAuthor(article)){
                    res.redirect('/');
                    return;
                }

                res.render('article/edit', article)
            });

        })
    },

    editPost: (req, res) => {
        let id = req.params.id;
        let articleArgs = req.body;

        let errorMsg = validateArticles(articleArgs, req);

        if (errorMsg){
            res.render('article/edit', {error: errorMsg});
            return;
        }

        Article.update({_id: id}, {$set: {title: articleArgs.title, content: articleArgs.content}}).then(err => {
            res.redirect(`/article/details/${id}`)
        })
    },

    deleteGet: (req, res) => {
        let id = req.params.id;

        if (!req.isAuthenticated()){
            let returnUr1 = `/article/delete/${id}`;
            req.session.returnUr1 = returnUr1;

            res.redirect('/user/login');
            return;
        }
        Article.findById(id).then(article => {
            req.user.isInRole('Admin').then(isAdmin => {
                if (!isAdmin && !req.user.isAuthor(article)){
                    res.redirect('/');
                    return;
                }

                res.render('article/delete', article)
            });
        })
    },

    deletePost: (req, res) => {
        let id = req.params.id;

        Article.findByIdAndRemove(id).then(article => {
            let index = req.user.articles.indexOf(article.id);
            req.user.articles.splice(index, 1);
            req.user.save(err => {
                if (err){
                    res.redirect('/', {err: err.message})
                } else {
                    res.redirect('/');
                }
            })
        })
    }
};