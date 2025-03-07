import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { email, total, paymentMethod, cart } = await request.json();

    // Validate required fields
    if (!email || !total || !paymentMethod || !cart || !Array.isArray(cart)) {
      return new Response(
        JSON.stringify({ message: "Missing or invalid required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create a transporter object using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format the cart items into a table
    const cartItemsTable = cart
      .map(
        (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>₹${item.price.toLocaleString()}</td>
          <td>₹${(item.price * item.quantity).toLocaleString()}</td>
        </tr>
      `
      )
      .join("");

    // Define the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Order Invoice - Ambika Novelty",
      html: `
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://res.cloudinary.com/dxwugphxt/image/upload/c_thumb,w_200,g_face/v1740569820/ambika-novelty_ragok5.png"
            alt="Ambika Novelty Logo" style="width: 150px;">
        </div>

        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h1 style="text-align: center; color: #333;">Thank you for your order!</h1>
          <p style="text-align: center; color: #555;">We appreciate your business. Below are the details of your purchase.</p>

          <h2 style="color: #333;">Order Summary</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f9f9f9;">
                <th style="padding: 10px; border: 1px solid #ddd;">Product Name</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Quantity</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${cartItemsTable}
            </tbody>
          </table>

          <h3 style="color: #333;">Payment Details</h3>
          <p><strong>Total Amount:</strong> ₹${Number(total).toLocaleString()}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod}</p>

          <p style="color: #333; margin-top: 20px;"><strong>Delivery Information:</strong> Your order will be delivered within a few days.</p>

          <p style="text-align: center; color: #777; margin-top: 20px;">If you have any questions, feel free to contact us.</p>
          <p style="text-align: center; color: #777;">Thank you for shopping with Ambika Novelty!</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    // Return error response
    return new Response(
      JSON.stringify({
        message: "Failed to send email",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}