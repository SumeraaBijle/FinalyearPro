import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request) {
  try {
    const client = await clientPromise
    const db = client.db("User")

    const formData = await request.formData()
    const image = formData.get("image")

    // Upload image to Cloudinary if present
    let imageUrl = null
    if (image) {
      // Convert the file to base64
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64Image = buffer.toString("base64")

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(`data:${image.type};base64,${base64Image}`, {
        folder: "products",
      })
      imageUrl = result.secure_url
    }

    const product = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
      category: formData.get("category"),
      image: imageUrl,
      createdAt: new Date(),
    }

    const result = await db.collection("products").insertOne(product)

    return NextResponse.json(
      {
        message: "Product added successfully",
        productId: result.insertedId,
        imageUrl: imageUrl,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error adding product:", error)
    return NextResponse.json(
      {
        message: "Error adding product",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("User")
    const products = await db.collection("products").find({}).toArray()
    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      {
        message: "Error fetching products",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

