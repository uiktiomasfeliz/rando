const TruckController = require('../controllers/truck.controller');
const asyncify = require('express-asyncify');
const router = asyncify(require('express').Router());

// Get all Posts
router.route('/trucks').get(TruckController.getTrucks);

// Get one post by cuid / id
router.route('/trucks/:id').get(TruckController.getTruck);

// Add a new Post
router.route('/trucks').post(TruckController.addTruck);

// Add a new Put
router.route('/trucks').put(TruckController.editTruck);

// Delete a post by cuid / id
router.route('/trucks/:id').delete(TruckController.deleteTruck);

module.exports = router;