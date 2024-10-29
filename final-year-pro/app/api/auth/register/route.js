// app/api/auth/register/route.js
import clientPromise from '../../../../lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { name, email, password } = await req.json();
  const client = await clientPromise;
  const db = client.db('myWEBSITE'); // Replace 'yourDatabaseName' with the actual database name

  // Check if the user already exists
  const existingUser = await db.collection('Users').findOne({ email });
  console.log('Checking existing user:', existingUser); // Log for debugging
  if (existingUser) {
    return new Response(
      JSON.stringify({ message: 'User already exists' }),
      { status: 409, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Hash the password and create a new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { name, email, password: hashedPassword };
  await db.collection('Users').insertOne(newUser);

  return new Response(
    JSON.stringify({ message: 'User registered successfully!' }),
    { status: 201, headers: { 'Content-Type': 'application/json' } }
  );
}
