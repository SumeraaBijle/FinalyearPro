import clientPromise from '../../../../lib/mongodb';  
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { name, email, password } = await req.json();
  const client = await clientPromise;  
  const db = client.db('User'); 

  const existingUser = await db.collection('register').findOne({ email }); 
  if (existingUser) {
    return new Response(
      JSON.stringify({ message: 'User already exists' }),
      { status: 409, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { name, email, password: hashedPassword };

  await db.collection('register').insertOne(newUser); 

  return new Response(
    JSON.stringify({ message: 'User registered successfully!' }),
    { status: 201, headers: { 'Content-Type': 'application/json' } }
  );
}
