import clientPromise from '../../../../lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const client = await clientPromise;
    const db = client.db('User'); 

   const user = await db.collection('register').findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ message: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(
    JSON.stringify({ message: 'Login successful!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}