const Product = require('../models/Product');

module.exports = {
	index: (req, res) => {
        Product.find().then(products => {
        	res.render('product/index', {'products':products});
		})
    	},
	createGet: (req, res) => {
        res.render('product/create');
	},
	createPost: (req, res) => {
        let productArgs = req.body;
        if (!productArgs.priority || !productArgs.name ||!productArgs.quantity || !productArgs.status){
            res.redirect('/');
            return;
        }
        Product.create(productArgs).then(product => {
            res.redirect('/');
        });
	},
	editGet: (req, res) => {
        let id = req.params.id;
        Product.findById(id).then(product => {
            if(!product){
                res.redirect('/'); 
                return;
            }
            res.render('product/edit', product);
        })
	},
	editPost: (req, res) => {

        let productId = req.params.id;
        let product = req.body;
        Product.findByIdAndUpdate(productId, product, {returnValidators:true}).then(product => {
            res.redirect('/');
        }).catch(err => {
            product.id = productId;
            product.error = 'Cannot edit task.';
            return res.render('product/edit', product);
        });
    }
};