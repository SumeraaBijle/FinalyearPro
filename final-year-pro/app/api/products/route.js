const { NextResponse } = require('next/server');
const clientPromise = require('@/lib/mongodb');
const { ObjectId } = require('mongodb');

async function POST(request) {
  try {
    const client = await clientPromise;
    console.log('MongoDB connected successfully'); // Add this log

    const db = client.db('User');
    const collection = db.collection('products');

    const formData = await request.formData();

    const product = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price')),
      quantity: parseInt(formData.get('quantity') || '0'),
      images: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    for (let i = 0; i < 5; i++) {
      const image = formData.get(`image${i}`);
      if (image instanceof File) {
        product.images.push(`/placeholder-${i}.jpg`);
      }
    }

    if (!product.name || !product.description || isNaN(product.price)) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Attempting to insert product:', product); // Add this log
    const result = await collection.insertOne(product);

    if (result.acknowledged) {
      return NextResponse.json({
        success: true,
        productId: result.insertedId.toString(),
        message: 'Product added successfully',
      });
    } else {
      throw new Error('Failed to insert product');
    }
  } catch (error) {
    console.error('Detailed error in POST /api/products:', error); // Enhanced error logging
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: error.stack, // Add stack trace for debugging
      },
      { status: 500 }
    );
  }
}

async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('User');
    const collection = db.collection('products');

    const products = await collection.find({}).toArray();

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error('Error in GET /api/products:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('User');
    const collection = db.collection('products');

    const result = await collection.deleteOne({ _id: new ObjectId(productId) });

    if (result.deletedCount === 1) {
      return NextResponse.json({
        success: true,
        message: 'Product deleted successfully',
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error in DELETE /api/products:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

module.exports = {
  POST,
  GET,
  DELETE,
};
