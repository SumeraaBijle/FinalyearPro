import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    const client = await clientPromise
    const db = client.db("User")

    // Check if user already exists
    const existingUser = await db.collection("register").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new user with hashed password
    const result = await db.collection("register").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    })

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Error creating user" }, { status: 500 })
  }
}

