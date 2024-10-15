import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    picture: String,
    userId: String,
    clientId: String,
});

const User = mongoose.model('User', userSchema);
export default User;
