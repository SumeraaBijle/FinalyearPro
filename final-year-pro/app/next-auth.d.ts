import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      phone?: string
      address?: string
    }
  }

  interface User {
    id: string
    name: string
    email: string
    phone?: string
    address?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    phone?: string
    address?: string
  }
}

