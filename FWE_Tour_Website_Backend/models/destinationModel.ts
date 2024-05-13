import mongoose, { Document, Model, Schema } from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, 'A destination must have a name'],
    unique: true,
    validate: {
      validator: function(value: any) {
        return value !== 'destinationError';
      },
      message: 'Destination name cannot be "destinationError"'
    }
  },
  
  tours: [{
    type: mongoose.Schema.ObjectId,
    ref: 'tour',
  }],

  description: {
    type: String, 
    trim: true
  }, 

  imageCover: [{
    type: String, 
    //required: [true, 'A destination must have a cover image']
  }]
});

const destinationModel = mongoose.model('destination', destinationSchema);

export { destinationModel }