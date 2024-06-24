import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CommentSchema = new Schema({
    username: { type: String, required: true },
    text: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course' }
});

const Comment = model('Comment', CommentSchema);

export default Comment;

