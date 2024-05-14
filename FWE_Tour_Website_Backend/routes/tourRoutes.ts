import express from 'express';
const tourController = require('../controllers/tourController');
const router = express.Router();

router
  .route('/')
  .get(tourController.getAllTours)

router
  .route('/newTour')
  .post(tourController.createTour)

router
  .route('/:name')
  .get(tourController.getTourUsingName)

router
  .route('/findTourByID/:id')
  .get(tourController.getTour)

/* router
  .route('/delete/:tourName')
  .delete(tourController.deleteATourByName) */

router
  .route('/updateTourByName/:tourName')
  .patch(tourController.updateTourByName)

router
  .route('/deleteATour/:id')
  .delete(tourController.deleteTour)

router
  .route('/findTourByDestination/:destination')
  .get(tourController.getTourUsingDestination);

router
  .route('/:tourName/addDestination')
  .patch(tourController.addDestinationToTour)

router
  .route('/:tourName/removeDestination/:destinationName')
  .patch(tourController.removeDestinationFromTour)

router
  .route('/tourError') 
  .get(tourController.errorNoTour)

module.exports = router;
