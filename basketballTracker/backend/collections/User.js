const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favoriteTeam: { type: String, default: '' },
    league: { type: String, default: '' },
    season: { type: String, default: '' }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
