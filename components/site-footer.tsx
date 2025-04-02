import Link from "next/link"
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-black text-white py-16 relative overflow-hidden">
      {/* Colorful accent elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-primary to-amber-500"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-24 h-24 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 rounded-full bg-rose-500/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-amber-500/10 blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-3xl font-serif font-bold mb-4">YABA</h3>

          <p className="text-gray-400 max-w-md mb-8">
            Prince of Rhumbacane, bringing the rhythm and soul of Kenya to the world stage.
          </p>

          <div className="mb-10 max-w-xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/#shows" className="text-gray-400 hover:text-primary transition-colors text-center">
                Shows
              </Link>
              <Link href="/#gallery" className="text-gray-400 hover:text-primary transition-colors text-center">
                Gallery
              </Link>
              <Link href="/#merchandise" className="text-gray-400 hover:text-primary transition-colors text-center">
                Merchandise
              </Link>
              <Link href="/#about" className="text-gray-400 hover:text-primary transition-colors text-center">
                About
              </Link>
              <Link
                href="/contact"
                className="w-full md:w-auto text-gray-400 hover:text-primary transition-colors text-center"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex space-x-6 mb-10">
            <Link
              href="https://instagram.com"
              className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-full hover:scale-110 transition-transform"
            >
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://twitter.com"
              className="bg-gradient-to-br from-blue-600 to-blue-400 p-3 rounded-full hover:scale-110 transition-transform"
            >
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://youtube.com"
              className="bg-gradient-to-br from-red-600 to-red-400 p-3 rounded-full hover:scale-110 transition-transform"
            >
              <Youtube className="h-6 w-6" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link
              href="https://facebook.com"
              className="bg-gradient-to-br from-blue-700 to-blue-500 p-3 rounded-full hover:scale-110 transition-transform"
            >
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>

          {/* Decorative divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-rose-500 via-primary to-amber-500 rounded-full mb-8"></div>

          {/* Centered copyright and powered by section */}
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-gray-500">© {new Date().getFullYear()} YABA. All rights reserved.</p>
            <p className="text-gray-500 mt-2">
              Powered by Stdio<span className="text-primary">X</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

