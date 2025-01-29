const { ObjectId } = require('mongodb');

module.exports = {
  products: {
    _id: ObjectId,
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    image: String,
    createdAt: Date,
    updatedAt: Date,
  }
};

