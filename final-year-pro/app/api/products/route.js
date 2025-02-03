import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { v2 as cloudinary } from "cloudinary"
import { ObjectId } from "mongodb"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Helper function to extract ID from URL
function getIdFromUrl(url) {
  const parts = url.split("/")
  return parts[parts.length - 1]
}

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

export async function PUT(request) {
  try {
    console.log(request.url+"HIi");
    const client = await clientPromise
    const db = client.db("User")

    // Get product ID from URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const formData = await request.formData()
    const image = formData.get("image")

    let imageUrl = null
    if (image instanceof File) {
      // Upload new image to Cloudinary
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64Image = buffer.toString("base64")

      const result = await cloudinary.uploader.upload(`data:${image.type};base64,${base64Image}`, {
        folder: "products",
      })
      imageUrl = result.secure_url
    }
    const updatedProduct = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
      category: formData.get("category"),
      ...(imageUrl && { image: imageUrl }),
      updatedAt: new Date(),
    }
   
    const result = await db.collection("products").updateOne({ _id: new ObjectId(id) }, { $set: updatedProduct })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Product updated successfully", product: updatedProduct }, { status: 200 })
  } catch (error) {
    console.error("Error updating product:", error.mes)
    return NextResponse.json({ error: "Error updating product", details: error.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("User")

    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Error deleting product", details: error.message }, { status: 500 })
  }
}

// Add this new function to handle all HTTP methods
export async function handler(request) {
  // Get the HTTP method
  const method = request.method

  // Route the request to the appropriate function
  switch (method) {
    case "GET":
      return GET(request)
    case "POST":
      return POST(request)
    case "PUT":
      return PUT(request)
    case "DELETE":
      return DELETE(request)
    default:
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
  }
}

