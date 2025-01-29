import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("User")

    const users = await db.collection("register").find({}).toArray()

    // Remove sensitive information like passwords before sending
    const sanitizedUsers = users.map(({ _id, name, email, createdAt }) => ({
      id: _id.toString(),
      name,
      email,
      createdAt,
    }))

    return NextResponse.json({ users: sanitizedUsers }, { status: 200 })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 })
  }
}
