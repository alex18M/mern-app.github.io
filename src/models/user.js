const mongoose = require('mongoose'); // Import mongoose
const { Schema } = mongoose;// Import Schema from mongoose

const UserSchema = new Schema({// Create a new Schema
    name: { type: String, required: true },
    APaterno: { type: String, required: true },
    AMaterno: { type: String, required: true },
    age: { type: Number, required: true },
    dateN: { type: Date, required: true },
    maritalStatus: { type: String, required: true },
    phoneN: { type: Number, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    town: { type: String, required: true },
    zipcode: { type: Number, required: true },
    lenguage: { type: String, required: true },
    hobby: { type: String, required: true },
    preference: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);