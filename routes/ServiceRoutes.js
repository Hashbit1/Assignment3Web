// routes/ServiceRoutes.js

const express = require('express');
const router = express.Router();
const Service = require('../models/Service'); // Mongoose model
const { ensureAuth } = require('../middleware/auth'); // middleware to protect C/U/D

// ---------------- READ: list all services (everyone can view) ----------------
router.get('/', async (req, res) => {
  try {
    // Find all services, sorted by date (oldest first)
    const services = await Service.find().sort({ serviceDate: 1 });
    res.render('Services/index', { services }); // views/Services/index.ejs
  } catch (err) {
    console.error('Error fetching services:', err.message);
    res.status(500).send('Error fetching services');
  }
});

// ---------------- CREATE: show form (only logged-in users) ----------------
router.get('/new', ensureAuth, (req, res) => {
  // Only authenticated users can add new services
  res.render('Services/new'); // views/Services/new.ejs
});

// Handle form submission to create a new service
router.post('/', ensureAuth, async (req, res) => {
  try {
    await Service.create({
      vehicleName: req.body.vehicleName,
      serviceType: req.body.serviceType,
      serviceDate: req.body.serviceDate,
      cost: req.body.cost,
      mileage: req.body.mileage,
      notes: req.body.notes,
    });

    res.redirect('/services');
  } catch (err) {
    console.error('Error creating service:', err.message);
    res.status(500).send('Error creating service');
  }
});

// ---------------- UPDATE: show edit form (only logged-in users) ----------------
router.get('/:id/edit', ensureAuth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).send('Service not found');

    res.render('Services/edit', { service }); // views/Services/edit.ejs
  } catch (err) {
    console.error('Error loading service for edit:', err.message);
    res.status(500).send('Error loading service');
  }
});

// Handle PUT request to update a service
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    await Service.findByIdAndUpdate(
      req.params.id,
      {
        vehicleName: req.body.vehicleName,
        serviceType: req.body.serviceType,
        serviceDate: req.body.serviceDate,
        cost: req.body.cost,
        mileage: req.body.mileage,
        notes: req.body.notes,
      },
      { runValidators: true }
    );

    res.redirect('/services');
  } catch (err) {
    console.error('Error updating service:', err.message);
    res.status(500).send('Error updating service');
  }
});

// ---------------- DELETE: confirmation page (only logged-in users) ----------------
router.get('/:id/delete', ensureAuth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).send('Service not found');

    res.render('Services/delete', { service }); // views/Services/delete.ejs
  } catch (err) {
    console.error('Error loading delete page:', err.message);
    res.status(500).send('Error loading delete page');
  }
});

// Handle DELETE request to remove a service
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.redirect('/services');
  } catch (err) {
    console.error('Error deleting service:', err.message);
    res.status(500).send('Error deleting service');
  }
});

module.exports = router;
