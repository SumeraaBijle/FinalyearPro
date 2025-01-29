import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PUT(request) {
  try {
    const { userId, phone, address } = await request.json()

    if (!userId || !phone || !address) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("User")

    const objectId = new ObjectId(userId)

    const result = await db.collection("register").updateOne(
      { _id: objectId },
      {
        $set: {
          phone,
          address,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "No changes made to profile" }, { status: 200 })
    }

    return NextResponse.json({ message: "Profile updated successfully", success: true }, { status: 200 })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json(
      {
        message: "Error updating profile",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
