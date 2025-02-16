import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("User");

    // Fetch all products
    const allProducts = await db.collection("products").find({}).toArray();

    // Randomly select a subset of products (e.g., 4 products)
    const featuredProducts = getRandomSubset(allProducts, 4);

    return NextResponse.json({ products: featuredProducts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json(
      {
        message: "Error fetching featured products",
        error: error.message,
      },
      { status: 500 }
    );
  }

  // Helper function to get a random subset of products
  function getRandomSubset(array, size) {
    // Shuffle the array without mutating the original
    const shuffled = Array.from(array).sort(() => Math.random() - 0.5);
    // Return the first `size` elements
    return shuffled.slice(0, size);
  }
}
