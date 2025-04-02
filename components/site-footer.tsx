import Link from "next/link"
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-bold">YABA</h3>
          <p className="text-gray-400 max-w-xs">
            Prince of Rhumbacane, bringing the rhythm and soul of Kenya to the world stage.
          </p>
          <div className="flex space-x-4">
            <Link href="https://instagram.com" className="hover:text-primary">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="https://twitter.com" className="hover:text-primary">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://youtube.com" className="hover:text-primary">
              <Youtube className="h-6 w-6" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link href="https://facebook.com" className="hover:text-primary">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/#shows" className="text-gray-400 hover:text-white">
                Shows
              </Link>
            </li>
            <li>
              <Link href="/#gallery" className="text-gray-400 hover:text-white">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/#merchandise" className="text-gray-400 hover:text-white">
                Merchandise
              </Link>
            </li>
            <li>
              <Link href="/#about" className="text-gray-400 hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Email: booking@yaba.com</li>
            <li>Phone: +254 712 345 678</li>
            <li>Management: management@yaba.com</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Newsletter</h3>
          <p className="text-gray-400 mb-4">Subscribe to get updates on new releases, shows, and more.</p>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="container mt-8 pt-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">© {new Date().getFullYear()} YABA. All rights reserved.</p>
          <p className="text-gray-500 mt-2 md:mt-0">
            Powered by Studio<span className="text-red-800">X</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

