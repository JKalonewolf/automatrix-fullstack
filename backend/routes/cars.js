const express = require('express');
const router = express.Router();
const Car = require('../models/CarModel');
const authMiddleware = require('../utils/authMiddleware');
const multer = require('multer');

// ------------------ Image Upload Setup ------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// ------------------ Routes ------------------

// GET /api/cars - get all cars (public)
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/cars/:id - get car by id (public)
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/cars - add a new car (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });

    const { name, make, model, year, price, mileage, fuelType, description } = req.body;

    const car = new Car({ name, make, model, year, price, mileage, fuelType, description });
    await car.save();

    res.status(201).json({ message: "Car added successfully", car });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT /api/cars/:id - update a car (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCar) return res.status(404).json({ message: "Car not found" });

    res.json({ message: "Car updated successfully", car: updatedCar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/cars/:id - delete a car (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });

    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) return res.status(404).json({ message: "Car not found" });

    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
