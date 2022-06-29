const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	confirmPassword: { type: String },
});

module.exports = model('User', UserSchema);
