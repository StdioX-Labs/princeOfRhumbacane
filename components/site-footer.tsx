import Link from "next/link"
import { Instagram, Twitter, Youtube, Facebook, Mail, MapPin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-[#1A2421] text-[#F0FFF0] py-16 relative overflow-hidden border-t border-[#708238]/20">
      {/* Elegant accent line at top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#9DC183] to-transparent"></div>

      {/* Subtle background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#708238]/5 blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#9DC183]/5 blur-[120px]"></div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#708238]/30"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#708238]/30"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#708238]/30"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#708238]/30"></div>

      <div className="container relative z-10">
        <div className="grid gap-12 md:grid-cols-3 mb-12">
          {/* Brand Section */}
          <div className="text-center md:text-left space-y-4">
            <div className="inline-block">
              <h3 className="text-4xl font-serif font-bold text-[#F0FFF0] mb-2">YABA</h3>
              <div className="h-[2px] w-full bg-gradient-to-r from-[#708238] to-[#9DC183]"></div>
            </div>
            <p className="text-[#9DC183]/80 max-w-xs leading-relaxed">
              Prince of Rhumbacane, bringing the rhythm and soul of Kenya to the world stage.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center space-y-4">
            <h4 className="text-lg font-semibold text-[#F0FFF0] tracking-wider uppercase mb-6">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/#about"
                className="text-[#9DC183]/70 hover:text-[#9DC183] transition-colors duration-300 relative inline-block group"
              >
                <span className="relative">
                  About
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1px] bg-[#9DC183] transition-all duration-300"></span>
                </span>
              </Link>
              <Link
                href="/#music"
                className="text-[#9DC183]/70 hover:text-[#9DC183] transition-colors duration-300 relative inline-block group"
              >
                <span className="relative">
                  Music
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1px] bg-[#9DC183] transition-all duration-300"></span>
                </span>
              </Link>
              <Link
                href="/events"
                className="text-[#9DC183]/70 hover:text-[#9DC183] transition-colors duration-300 relative inline-block group"
              >
                <span className="relative">
                  Events
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1px] bg-[#9DC183] transition-all duration-300"></span>
                </span>
              </Link>
              <Link
                href="/contact"
                className="text-[#9DC183]/70 hover:text-[#9DC183] transition-colors duration-300 relative inline-block group"
              >
                <span className="relative">
                  Contact
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1px] bg-[#9DC183] transition-all duration-300"></span>
                </span>
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-right space-y-6">
            <h4 className="text-lg font-semibold text-[#F0FFF0] tracking-wider uppercase mb-6">
              Connect
            </h4>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-[#9DC183]/70">
              <div className="flex items-center justify-center md:justify-end gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@yaba.music" className="hover:text-[#9DC183] transition-colors">
                  info@yaba.music
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <MapPin className="h-4 w-4" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex justify-center md:justify-end gap-4 pt-2">
              <Link
                href="https://instagram.com"
                className="group relative p-3 rounded-full border border-[#708238]/30 hover:border-[#9DC183] bg-[#708238]/10 hover:bg-[#708238]/20 transition-all duration-300"
              >
                <Instagram className="h-5 w-5 text-[#9DC183]/70 group-hover:text-[#9DC183] transition-colors" />
                <span className="sr-only">Instagram</span>
                <div className="absolute inset-0 bg-[#9DC183]/0 group-hover:bg-[#9DC183]/10 rounded-full transition-colors duration-300"></div>
              </Link>
              <Link
                href="https://twitter.com"
                className="group relative p-3 rounded-full border border-[#708238]/30 hover:border-[#9DC183] bg-[#708238]/10 hover:bg-[#708238]/20 transition-all duration-300"
              >
                <Twitter className="h-5 w-5 text-[#9DC183]/70 group-hover:text-[#9DC183] transition-colors" />
                <span className="sr-only">Twitter</span>
                <div className="absolute inset-0 bg-[#9DC183]/0 group-hover:bg-[#9DC183]/10 rounded-full transition-colors duration-300"></div>
              </Link>
              <Link
                href="https://youtube.com"
                className="group relative p-3 rounded-full border border-[#708238]/30 hover:border-[#9DC183] bg-[#708238]/10 hover:bg-[#708238]/20 transition-all duration-300"
              >
                <Youtube className="h-5 w-5 text-[#9DC183]/70 group-hover:text-[#9DC183] transition-colors" />
                <span className="sr-only">YouTube</span>
                <div className="absolute inset-0 bg-[#9DC183]/0 group-hover:bg-[#9DC183]/10 rounded-full transition-colors duration-300"></div>
              </Link>
              <Link
                href="https://facebook.com"
                className="group relative p-3 rounded-full border border-[#708238]/30 hover:border-[#9DC183] bg-[#708238]/10 hover:bg-[#708238]/20 transition-all duration-300"
              >
                <Facebook className="h-5 w-5 text-[#9DC183]/70 group-hover:text-[#9DC183] transition-colors" />
                <span className="sr-only">Facebook</span>
                <div className="absolute inset-0 bg-[#9DC183]/0 group-hover:bg-[#9DC183]/10 rounded-full transition-colors duration-300"></div>
              </Link>
            </div>
          </div>
        </div>

        {/* Elegant divider */}
        <div className="relative my-8">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#708238]/30 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#9DC183] rotate-45"></div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#9DC183]/60">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} YABA. All rights reserved.
          </p>
          <p className="text-center md:text-right flex items-center gap-2">
            Crafted with passion by
            <span className="text-[#F0FFF0] font-medium">
              Stdio<span className="text-[#9DC183]">X</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

