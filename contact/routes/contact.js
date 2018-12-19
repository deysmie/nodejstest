var express = require('express');
var router = express.Router();
//var jwt = require('json-web-token')
var jwt = require('express-jwt');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
//connecting to mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contact_db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
let Schema = mongoose.Schema;

let contactModelSchema = new Schema({
	name: String, 
	phone: String, 
	email: String
});

var auth = jwt({
	secret:'private',
	userProperty:'payload'
});

//create model
let contactModel = mongoose.model('contactModel', contactModelSchema);

//creating schema field types
let contact = new Schema({
	name:{ 
		type: String
	}, 
	phone:{
		type: String
	}, 
	email:{
		type: String
	},
	updated:{ 
		type: Date, default: Date.now
	}
});
// console.log(db);

router.post('/',  function(req, res, next) {
	let addContact= new contactModel({
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email
	});
	addContact.save(function (err, result) {
		if (err) return handleError(err);
		res.status(200).send(result);
	})
});



router.get('/:id', function(req, res, next) {
	let id = req.params.id;
	contactModel.findById(id,( function(err,result){
		if (err) throw err; 
		// console.log(result);
  		res.send(result);
	}));


});


router.put('/', function(req, res, next) {
	let myquery = req.body.id ;
	contactModel.findOneAndUpdate({_id:req.body.id},req.body,{new:true}, function(err,result){
		if(err)
			res.send(err);
		res.send('Update Successful');
	});
});


router.delete('/', function(req, res, next) {
	contactModel.remove({_id:req.body.id}, function(err,result){
		if(err)
			res.send(err);
		res.send('Post deleted successfully!');
	});
});

module.exports = router;
