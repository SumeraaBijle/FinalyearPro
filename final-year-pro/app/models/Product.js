const { ObjectId } = require('mongodb');

module.exports = {
  products: {
    _id: ObjectId,
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    images: [String],
    createdAt: Date,
    updatedAt: Date,
  }
};

