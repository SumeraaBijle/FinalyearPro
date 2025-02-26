import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb"; // Import ObjectId for handling MongoDB IDs

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("User");

    // Fetch all orders from `orders` collection
    const orders = await db.collection("orders").find({}).toArray();

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Failed to fetch orders", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("User");

    const { customer, products, totalAmount, paymentMethod } = await req.json();

    if (!customer || !products || !totalAmount || !paymentMethod) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert order into the `orders` collection
    const order = await db.collection("orders").insertOne({
      customer,
      products,
      totalAmount,
      paymentMethod,
      status: "Pending",
      createdAt: new Date(),
    });

    // Update product stock using MongoDB's `$inc`
    await Promise.all(
      products.map(async (item) => {
        await db.collection("products").updateOne(
          { _id: new ObjectId(item.productId) },
          { $inc: { quantity: -item.quantity } }
        );
      })
    );

    return NextResponse.json(
      { message: "Order created successfully", orderId: order.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Failed to create order", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const client = await clientPromise;
    const db = client.db("User");

    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("id");

    if (!orderId) {
      return NextResponse.json({ message: "Order ID is required" }, { status: 400 });
    }

    // Update the order status to "Cancelled"
    const result = await db.collection("orders").updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status: "Cancelled" } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "Order not found or already cancelled" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order cancelled successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return NextResponse.json({ message: "Failed to cancel order", error: error.message }, { status: 500 });
  }
}
