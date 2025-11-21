const express = require('express');
const router = express.Router();
const Service = require('../models/Service'); // Mongoose model

// Show the service history page with all services from the database
router.get('/', async (req, res) => {
  try {
    // Find all services and sort them by date (oldest first)
    const services = await Service.find().sort({ serviceDate: 1 });

     // Render the Services/index.ejs view and pass the list of services to it
    res.render('Services/index', { services });
  } catch (err) {
    console.error('Error fetching services:', err.message);
    res.status(500).send('Error fetching services');
  }
});

// Shows the form to add a new service record
router.get('/new', (req, res) => {
  res.render('Services/new');
});

// Handle form submission to create a new service record
router.post('/', async (req, res) => {
  try {

     // Create a new service document using the form data from req.body
    await Service.create({
      vehicleName: req.body.vehicleName,
      serviceType: req.body.serviceType,
      serviceDate: req.body.serviceDate,
      cost: req.body.cost,
      mileage: req.body.mileage,
      notes: req.body.notes,
    });

    //redirects back to the list of services
    res.redirect('/services');
  } catch (err) {
    console.error('Error creating service:', err.message);
    res.status(500).send('Error creating service');
  }
});

//shows edit form
router.get('/:id/edit', async (req, res) => {
  try {
    // Look up the service by its MongoDB id
    const service = await Service.findById(req.params.id);

    if (!service) return res.status(404).send('Service not found');

     // Renders the edit form and pass the existing service data into it
    res.render('Services/edit', { service });
  } catch (err) {
    console.error('Error loading service for edit:', err.message);
    res.status(500).send('Error loading service');
  }
});

// Updates a service
router.put('/:id', async (req, res) => {
  try {
     // Find the service by id and update its fields with the new form data
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

    // Redirect back to the list of services after updating
    res.redirect('/services');
  } catch (err) {
    console.error('Error updating service:', err.message);
    res.status(500).send('Error updating service');
  }
});

// Show delete confirmation
router.get('/:id/delete', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).send('Service not found');

     // Renders a delete confirmation view and show the service details
    res.render('Services/delete', { service });
  } catch (err) {
    console.error('Error loading delete page:', err.message);
    res.status(500).send('Error loading delete page');
  }
});

// Fully deletes the service after the user confirms
router.delete('/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.redirect('/services');
  } catch (err) {
    console.error('Error deleting service:', err.message);
    res.status(500).send('Error deleting service');
  }
});

module.exports = router;
