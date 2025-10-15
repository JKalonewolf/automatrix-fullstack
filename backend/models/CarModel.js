const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1886 }, // first car invented
    price: { type: Number, required: true, min: 0 },
    mileage: { type: Number, required: true, min: 0 },
    fuelType: { 
        type: String, 
        required: true, 
        lowercase: true, 
        enum: ['electric', 'gas', 'hybrid', 'petrol', 'diesel'] 
    },
    description: { type: String, default: '' },
    images: [{ type: String, default: [] }],
    available: { type: Boolean, default: true }
}, { timestamps: true });

// Optional: auto-cast string numbers to numbers (if data comes from frontend as string)
carSchema.pre('save', function(next) {
    if (typeof this.year === 'string') this.year = Number(this.year);
    if (typeof this.price === 'string') this.price = Number(this.price);
    if (typeof this.mileage === 'string') this.mileage = Number(this.mileage);
    next();
});

module.exports = mongoose.model('Car', carSchema);
