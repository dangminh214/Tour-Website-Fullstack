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

router
  .route('/destinationError') 
  .get(destinationController.errorNoDestination)

router
  .route('/deleteADestination/:id')
  .delete(destinationController.deleteDestination)

module.exports = router;