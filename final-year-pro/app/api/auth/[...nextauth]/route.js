import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required")
        }

        try {
          const client = await clientPromise
          const db = client.db("User")

          const user = await db.collection("register").findOne({
            email: credentials.email,
          })

          if (!user) {
            throw new Error("No user found with this email")
          }

          // For debugging: log the lengths of the passwords
          console.log("Debug - Password lengths:", {
            provided: credentials.password.length,
            stored: user.password.length,
          })

          // Check if the stored password is already hashed
          const isHashed = user.password.startsWith("$2a$") || user.password.startsWith("$2b$")

          let isValid
          if (isHashed) {
            // If password is hashed, use bcrypt compare
            isValid = await bcrypt.compare(credentials.password, user.password)
          } else {
            // If password isn't hashed (legacy), do direct comparison
            // You might want to hash it here for future use
            isValid = credentials.password === user.password
            if (isValid) {
              // Update the password to be hashed for next time
              const hashedPassword = await bcrypt.hash(credentials.password, 12)
              await db.collection("register").updateOne({ _id: user._id }, { $set: { password: hashedPassword } })
            }
          }

          if (!isValid) {
            console.log("Password verification failed")
            throw new Error("Invalid password")
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          }
        } catch (error) {
          console.error("Authorization error:", error)
          throw error
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Handle redirects
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },

  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

