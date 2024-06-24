import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CourseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

const Course = model('Course', CourseSchema);

export default Course;

