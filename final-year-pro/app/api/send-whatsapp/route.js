import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(req) {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    const data = await req.json();
    const { phone, orderDetails } = data;

    // Format phone number
    const formattedPhone = phone.replace(/\s+/g, '');
    const phoneWithCountryCode = formattedPhone.startsWith('+91') 
      ? formattedPhone 
      : `+91${formattedPhone}`;

    // Create message template
    const message = `Thank you for shopping at Ambika Gift and Novelty!

Order Details:
- Product: ${orderDetails.productName}
- Total Amount: ₹${orderDetails.totalAmount}
- Payment Method: ${orderDetails.paymentMethod}
- Order Status: Confirmed

Your order has been successfully placed and will be processed soon.

For any queries, please contact our support team.`;

    // Send WhatsApp message
    const response = await client.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${phoneWithCountryCode}`
    });

    return NextResponse.json({ 
      success: true, 
      messageId: response.sid 
    });
  } catch (error) {
    console.error('WhatsApp Error:', error);
    return NextResponse.json({ 
      error: error.message 
    }, { 
      status: 500 
    });
  }
}