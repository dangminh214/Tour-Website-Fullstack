import express, { Request, Response } from 'express';

const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);

module.exports = router;