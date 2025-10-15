const express = require("express");
const router = express.Router();
const Service = require("../models/ServiceModel");
const authMiddleware = require("../utils/authMiddleware");

// ------------------ Routes ------------------

// GET /api/services - all services (admin only)
router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const services = await Service.find()
      .populate("carId", "make model year fuelType price")
      .populate("customerId", "name email phone address");

    res.json(services);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/services/:id - single service (admin only)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const service = await Service.findById(req.params.id)
      .populate("carId", "make model year fuelType price")
      .populate("customerId", "name email phone address");

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (err) {
    console.error("Error fetching service:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/services - create new service (admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { customerId, carId, serviceType, notes } = req.body;
    if (!customerId || !carId || !serviceType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const service = new Service({ customerId, carId, serviceType, notes });
    await service.save();

    const populatedService = await Service.findById(service._id)
      .populate("carId", "make model year fuelType price")
      .populate("customerId", "name email phone address");

    res.status(201).json(populatedService);
  } catch (err) {
    console.error("Error creating service:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT /api/services/:id - update service (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("carId", "make model year fuelType price")
      .populate("customerId", "name email phone address");

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(updatedService);
  } catch (err) {
    console.error("Error updating service:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/services/:id - delete service (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service deleted successfully", id: deletedService._id });
  } catch (err) {
    console.error("Error deleting service:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
