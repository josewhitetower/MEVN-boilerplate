
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const  Post = require("../models/post");

router.get('/posts', (req, res) => {
  Post.find({}, 'title description', function (error, posts) {
	  if (error) { console.error(error); }
	  res.send({
			posts: posts
		})
	}).sort({_id:-1})
})

router.post('/add_post', (req, res) => {
	var db = req.db;
	var title = req.body.title;
	var description = req.body.description;
	var new_post = new Post({
		title: title,
		description: description
	})

	new_post.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
})

router.put('/posts/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'title description', function (error, post) {
	  if (error) { console.error(error); }

	  post.title = req.body.title
	  post.description = req.body.description
	  post.save(function (error) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true
			})
		})
	})
})

router.delete('/posts/:id', (req, res) => {
	var db = req.db;
	Post.remove({
		_id: req.params.id
	}, function(err, post){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

router.get('/post/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'title description', function (error, post) {
	  if (error) { console.error(error); }
	  res.send(post)
	})
})

module.exports = router;