var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/gamecenter.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the gamecenter database.');
});

let initDbSwitch = 'create table if not exists switch(name TEXT NOT NULL, release_date DATE NOT NULL, like_count INTEGER NOT NULL DEFAULT 0, image_url TEXT)'
let initDbPs4 = 'create table if not exists ps4(name TEXT NOT NULL, release_date DATE NOT NULL, like_count INTEGER NOT NULL DEFAULT 0, image_url TEXT)'
let initDbxbox = 'create table if not exists xbox(name TEXT NOT NULL, release_date DATE NOT NULL, like_count INTEGER NOT NULL DEFAULT 0, image_url TEXT)'

let insertsqlSwitch = 'insert into switch(name, release_date) values(?,?)'
let insertsqlPs4 = 'insert into ps4(name, release_date) values(?,?)'
let insertsqlxbox = 'insert into xbox(name, release_date) values(?,?)'

db.run(initDbSwitch)
db.run(initDbPs4)
db.run(initDbxbox)

let querySwitch = 'select * from switch'
let queryPS4 = 'select * from ps4'
let queryxbox = 'select * from xbox'



/* GET home page. */
router.route('/ps4')
.post(function(req, res, next) {
  var params = req.body
  db.run(insertsqlPs4, params.name, params.release_date, function(err){
  		console.log(err)
  		res.sendStatus(500)
  })
  res.sendStatus(200)
})
.get(function(req, res) {
	var result = null
	db.all(queryPS4, [], (err, rows) => {
		if(err) {
			console.log(err)
			res.sendStatus(500)
		}
		result = rows
		res.send(result)
	})
});

router.route('/xbox')
.post(function(req, res, next) {
  var params = req.body
  db.run(insertsqlxbox, params.name, params.release_date, function(err){
  		console.log(err)
  })
  res.sendStatus(200)
})
.get(function(req, res) {
	var result = null
	db.all(queryxbox, [], (err, rows) => {
		if(err) {
			console.log(err)
			res.sendStatus(500)
		}
		result = rows
		res.send(result)
	})
});

router.route('/switch')
.get(function(req, res) {
	var result = null
	db.all(querySwitch, [], (err, rows) => {
		if(err) {
			console.log(err)
			res.sendStatus(500)
		}
		result = rows
		res.send(result)
	})
})
.post(function(req, res, next) {
  var params = req.body
  if(params.name == null || params.release_date == null) {
  	res.sendStatus(500)
  }
  db.run(insertsqlSwitch, params.name, params.release_date, function(err){
  		res.sendStatus(500)
  })
  res.sendStatus(200)
});


// router.get('/', function(req, res, next) {
//   res.sendStatus(200)
// });

module.exports = router;