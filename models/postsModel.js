const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    location: {
        type: { type: String },
        coordinates: [],
    }
});

PostSchema.index({ location: '2dsphere' });

module.exports = Post = mongoose.model('post', PostSchema);
