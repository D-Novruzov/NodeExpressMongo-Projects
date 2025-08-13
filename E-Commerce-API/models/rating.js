const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      minlength: 10,
      maxlength: 1000,
    },
  },
  {
    timestamps: true, 
  }
);

RatingSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('Rating', RatingSchema);