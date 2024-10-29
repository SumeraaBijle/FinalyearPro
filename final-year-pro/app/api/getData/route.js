// app/api/getData/route.js

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';




export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('myWEBSITE');

    const data = await db.collection('Users').find({}).toArray();

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}
