//import mongoose:-->This library allows us to interact with MongoDB databases in our Node.js application.
import mongoose from 'mongoose';

//bcryptjs: This library helps us securely hash passwords before storing them in the database.
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Hash password before saving to database
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
});

const User = mongoose.model('User', userSchema);

export default User;



