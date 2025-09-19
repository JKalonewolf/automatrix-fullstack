const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    //inquiries: [{ type: String }] // car inquiries
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
