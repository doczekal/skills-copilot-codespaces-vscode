// Create web server for comment
// Created by: Steven Shi
// Created on: 10/30/2019

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Define port
const port = 3000;

// Create app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/commentDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// Define model
const Comment = mongoose.model('Comment', commentSchema);

// Use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use cors
app.use(cors());

// Get all comments
app.get('/comment', (req, res) => {
    Comment.find({}, (err, foundComments) => {
        if (!err) {
            res.send(foundComments);
        } else {
            res.send(err);
        }
    });
});

// Post a comment
app.post('/comment', (req, res) => {
    const newComment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });

    newComment.save((err) => {
        if (!err) {
            res.send('Successfully added a new comment.');
        } else {
            res.send(err);
        }
    });
});

// Listen on port
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


