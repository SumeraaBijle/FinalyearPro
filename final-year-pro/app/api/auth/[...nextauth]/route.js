import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  // Add Google as the authentication provider
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // MongoDB Adapter for NextAuth
  adapter: MongoDBAdapter(clientPromise),

  // Secret for token encryption
  secret: process.env.NEXTAUTH_SECRET,

  // Callbacks to handle custom behavior
  callbacks: {
    // Allow or deny sign-in
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return true; // Allow Google sign-ins
      }
      return false; // Block other providers if necessary
    },

    // Redirect users to a specific page after login
    async redirect({ url, baseUrl }) {
      // Always redirect to homepage
      return "/homepage";
    },
  },

  // Custom authentication pages
  pages: {
    signIn: "/login", // Custom login page
    error: "/auth/error", // Custom error page
  },

  // Enable debug mode for detailed logs in development
  debug: process.env.NODE_ENV === "development",
};

// Export the handler for NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
