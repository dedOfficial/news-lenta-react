const mongoose = require('mongoose');
const log = require('./log')(module);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect('mongodb+srv://admin:admin@cluster0.yla5d.mongodb.net/newsdb?retryWrites=true&w=majority&sslVerifyCertificate=false', options);

const db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

const Schema = mongoose.Schema;

// Schemas
const Photo = new Schema({
    albumId: { type: Number, required: false },
    id: { type: Number, required: false },
    title: { type: String, required: true },
    url: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
});

const Post = new Schema({
    userId: { type: Number, required: false },
    id: { type: Number, required: false },
    title: { type: String, required: true },
    body: { type: String, required: true },
});

const Comment = new Schema({
    postId: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    body: { type: String, required: true }
});

const PostModel = mongoose.model('Post', Post);
const PhotoModel = mongoose.model('Photo', Photo);
const CommentModel = mongoose.model('Comment', Comment);

module.exports.PostModel = PostModel;
module.exports.PhotoModel = PhotoModel;
module.exports.CommentModel = CommentModel;