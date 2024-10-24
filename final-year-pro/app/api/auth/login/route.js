// app/api/auth/login/route.js
import clientPromise from '../../../../lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { email, password } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  // Find the user by email
  const user = await db.collection('users').findOne({ email });
  console.log('User found:', user); // Log for debugging
  if (!user) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  // Compare the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  // If successful
  return new Response(JSON.stringify({ message: 'Login successful!' }), { status: 200 });
}
