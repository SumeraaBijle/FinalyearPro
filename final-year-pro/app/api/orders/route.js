import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

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
          { _id: item.productId },
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
