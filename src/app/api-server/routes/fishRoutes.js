const express = require('express');
const fishController = require('./../controllers/fishController');

const router = express.Router();

router
  .route('/')
  .get(fishController.getAllFish)
  .post(fishController.createFish);

router
  .route('/:id')
  .get(fishController.getFishById)
  .patch(fishController.updateFishById)
  .delete(fishController.deleteFishById);

module.exports = router;
