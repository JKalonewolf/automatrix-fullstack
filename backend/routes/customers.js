const express = require('express');
const router = express.Router();
const Customer = require('../models/CustomerModel');
const authMiddleware = require('../utils/authMiddleware');

// ------------------ Routes ------------------

// GET /api/customers - get all customers (admin only)
router.get('/', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });

        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// GET /api/customers/:id - get a customer by ID (admin only)
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });

        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ message: "Customer not found" });

        res.json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// POST /api/customers - add a new customer (admin only)
router.post("/", authMiddleware, async (req, res) => {
    try {
        console.log("Incoming body:", req.body);  // <--- Debug here

        const { name, email, phone, address } = req.body;
        if (!name || !email || !phone || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const customer = new Customer({ name, email, phone, address });
        await customer.save();

        res.status(201).json({ message: "Customer added successfully", customer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// PUT /api/customers/:id - update customer (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });

        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCustomer) return res.status(404).json({ message: "Customer not found" });

        res.json({ message: "Customer updated successfully", updatedCustomer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE /api/customers/:id - delete customer (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });

        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) return res.status(404).json({ message: "Customer not found" });

        res.json({ message: "Customer deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
