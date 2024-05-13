const mongoose = require('mongoose');
const destinationSchema = require('./destinationModel')
const { Schema } = mongoose;

const tourSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, 'A tour must have a name'],
    unique: true,
    validate: {
      validator: function(value: any) {
        return value !== 'destinationError';
      },
      message: 'Tour name cannot be "tourError"'
    }
  },

  destinations: [{
    type: mongoose.Schema.ObjectId,
    ref: 'destination',
    required: true
  }],

  description: {
    type: String, 
    trim: true
  }, 

  imageCover: [{
    type: String, 
  }]
});

const tourModel = new mongoose.model('tour', tourSchema);
export { tourModel }