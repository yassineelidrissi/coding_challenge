import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    sectors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sector' }]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;