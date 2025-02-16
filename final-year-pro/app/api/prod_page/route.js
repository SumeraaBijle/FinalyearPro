import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("User")
    const products = await db.collection("products").find({}).toArray()

    // Transform _id to string to ensure proper serialization
    const serializedProducts = products.map((product) => ({
      ...product,
      _id: product._id.toString(),
    }))

    return NextResponse.json({ products: serializedProducts }, { status: 200 })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      {
        message: "Error fetching products",
        error: error.message,
      },
      { status: 500 }
    )
  }
}
