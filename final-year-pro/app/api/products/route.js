import { NextResponse } from "next/server"
import connectToDatabase from "../../../lib/mongodb"

export async function GET() {
  try {
    const client = await connectToDatabase()
    const db = client.db()
    const products = await db.collection("products").find({}).toArray()
    return NextResponse.json({ success: true, products })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const client = await connectToDatabase()
    const db = client.db()

    const formData = await request.formData()
    const name = formData.get("name")
    const description = formData.get("description")
    const price = Number.parseFloat(formData.get("price"))
    const quantity = Number.parseInt(formData.get("quantity"))
    const category = formData.get("category")
    const image = formData.get("image")

    // Here you would typically handle file upload and store the image
    // For this example, we'll just store the file name
    const imagePath = image ? image.name : null

    const newProduct = {
      name,
      description,
      price,
      quantity,
      category,
      image: imagePath,
      createdAt: new Date(),
    }

    const result = await db.collection("products").insertOne(newProduct)
    return NextResponse.json({ success: true, product: result.ops[0] })
  } catch (error) {
    console.error("Error adding product:", error)
    return NextResponse.json({ success: false, error: "Failed to add product" }, { status: 500 })
  }
}

