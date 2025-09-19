const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  customerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Customer", 
    required: true 
  },
  carId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Car", 
    required: true 
  },
  serviceType: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ["pending", "completed"], 
    default: "pending" 
  },
  notes: { 
    type: String 
  }
});

module.exports = mongoose.model("Service", serviceSchema);
