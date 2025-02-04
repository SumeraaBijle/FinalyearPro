import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const { amount, currency } = await req.json();
    
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // Razorpay works in paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return Response.json(order);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
