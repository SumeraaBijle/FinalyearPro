import Link from "next/link"

export default function Footer() {
  return (
    <footer className="backdrop-blur-xl bg-gradient-to-r from-gray-100/90 via-gray-200/90 to-gray-300/90 py-16 border-t border-white/20 shadow-inner">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start text-gray-700">
          {/* Logo and Description */}
          <div className="mb-8 md:mb-0">
          <h1 className="text-4xl font-extrabold text-gray-800">
            <Link href="/homepage">
            Ambika<span className="text-pink-500">Novelty</span>
            </Link>
          </h1>
            <p className="text-sm mt-3 max-w-sm text-gray-600">
              Discover a wide range of products with unique designs and quality, made just for you.
            </p>
          </div>

          {/* Company Links */}
          <div className="flex flex-col md:flex-row gap-12">
            <div>
              <h4 className="font-semibold text-gray-800 text-lg mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/homepage" className="hover:text-pink-500 hover:underline transition duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/aboutus" className="hover:text-pink-500 hover:underline transition duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                <Link href="/privacy" className="hover:text-pink-500 hover:underline transition duration-300">Privacy Policy</Link>
                </li>
              </ul>
            </div>

            {/* Get in Touch */}
            <div>
              <h4 className="font-semibold text-gray-800 text-lg mb-4">Get in Touch</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="font-medium">Phone:</span>
                  <span className="text-pink-500">+91-123-456-7890</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Email:</span>
                  <a
                    href="mailto:ambikanovelty.biz@gmail.com"
                    className="text-pink-500 hover:underline transition duration-300"
                  >
                    ambikanovelty.biz@gmail.com
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 text-pink-500 hover:underline transition duration-300">
                    <img src="/images/insta.jpg" alt="Instagram" className="h-5 w-5" />
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center text-gray-600 text-sm">
          <p className="flex flex-col md:flex-row justify-center items-center gap-2">
            <span>
              Copyright 2025©{" "}
              <a href="http://localhost:3000" className="text-pink-500 hover:underline transition duration-300">
                ambikanovelty.com
              </a>
            </span>
            <span className="hidden md:inline-block">|</span>
            <span>All Rights Reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

