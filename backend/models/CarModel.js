const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, required: true },
    fuelType: { type: String, enum: ['Electric', 'gas', 'hybrid', 'Petrol', 'Diesel' ], required: true },
    description: { type: String },
    images: [{ type: String }],
    available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
