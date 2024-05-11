import express, { Request, Response } from 'express';

const destinationController = require('../controllers/destinationController');

const router = express.Router();

router
  .route('/')
  .get(destinationController.getAllDestination);
router
  .route('/newDestination')
  .post(destinationController.createDestination);
router
  .route('/:name')
  .get(destinationController.getDestinationUsingName);

module.exports = router;