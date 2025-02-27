"use client"
import Header from "../head/foot/Header";
import Footer from "../head/foot/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-violet-100 relative">
      {/* Enhanced background blur elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-pulse"></div>
        <div className="absolute top-20 -left-40 w-[600px] h-[600px] bg-violet-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-pulse delay-300"></div>
        <div className="absolute bottom-40 right-40 w-[550px] h-[550px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-pulse delay-700"></div>
      </div>

      <Header />

      <main className="container mx-auto px-4 py-8 relative">
        <section className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600">
            Privacy Policy
          </h1>

          <div className="space-y-6 text-gray-700">
            <p>
              At <strong>Ambika Novelty</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase from us.
            </p>

            <h2 className="text-2xl font-bold mt-6">1. Information We Collect</h2>
            <p>
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6">
              <li>Personal information (e.g., name, email address, phone number)</li>
              <li>Payment information (e.g., credit card details)</li>
              <li>Shipping and billing addresses</li>
              <li>Usage data (e.g., pages visited, time spent on the site)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">2. How We Use Your Information</h2>
            <p>
              We use your information for the following purposes:
            </p>
            <ul className="list-disc pl-6">
              <li>To process and fulfill your orders</li>
              <li>To communicate with you about your orders and inquiries</li>
              <li>To improve our website and services</li>
              <li>To send promotional offers (if you opt-in)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">3. Sharing Your Information</h2>
            <p>
              We do not sell or share your personal information with third parties except:
            </p>
            <ul className="list-disc pl-6">
              <li>With service providers who assist us in operating our website and fulfilling orders</li>
              <li>When required by law or to protect our rights</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold mt-6">5. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-6">
              <li>Access, update, or delete your personal information</li>
              <li>Opt-out of receiving promotional communications</li>
              <li>Request a copy of the data we hold about you</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">6. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the revised policy will be effective immediately upon posting.
            </p>

            <h2 className="text-2xl font-bold mt-6">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> ambikanovelty.biz@gmail.com<br />
              <strong>Phone:</strong> +91-123-456-7890<br />
              <strong>Address:</strong> 123 Stationery Lane, Mumbai, India
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}