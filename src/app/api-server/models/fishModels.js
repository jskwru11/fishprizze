const mongoose = require('mongoose');

const fishSchema = mongoose.Schema({
  catchee: {
    type: String,
    required: [true, 'Please Tell the world who caught this big fish!'],
  },
  species: {
    type: String,
    required: [true, 'A fish species is required to record your catch!'],
  },
  weight: {
    type: Number,
    required: [true, 'A fish weight is required to record your catch!'],
  },
  length: {
    type: Number,
    required: [true, 'A fish length is required to record your catch!'],
  },
  photo: {
    type: String,
  },
  dateCaught: {
    type: Date,
    required: [true, 'A Date is required to record your catch!'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Fish = mongoose.model('Fish', fishSchema);

module.exports = Fish;
