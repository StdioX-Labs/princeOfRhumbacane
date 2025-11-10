import Link from "next/link"
import { Instagram, Twitter, Youtube, Facebook, Mail, MapPin, Music, Heart } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-gradient-to-b from-[#1A2421] to-[#0f1512] text-[#F0FFF0] py-20 relative overflow-hidden border-t border-[#708238]/30">
      {/* Elegant accent line at top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#9DC183] to-transparent"></div>

      {/* Sophisticated background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#708238]/8 blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#9DC183]/8 blur-[150px]"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #9DC183 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Elegant corner accents */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#708238]/40 rounded-tl-lg"></div>
      <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#708238]/40 rounded-tr-lg"></div>
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#708238]/40 rounded-bl-lg"></div>
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#708238]/40 rounded-br-lg"></div>

      <div className="container relative z-10">
        <div className="grid gap-16 md:grid-cols-3 mb-16">
          {/* Brand Section */}
          <div className="text-center md:text-left space-y-6">
            <div className="inline-block group">
              <h3 className="text-5xl font-serif font-bold text-[#F0FFF0] mb-3 group-hover:text-[#9DC183] transition-colors duration-300">YABA</h3>
              <div className="h-[2px] w-full bg-gradient-to-r from-[#708238] via-[#9DC183] to-[#708238] rounded-full"></div>
            </div>
            <p className="text-[#9DC183]/70 max-w-xs leading-relaxed text-sm font-light">
              Prince of Rhumbacane, bringing the rhythm and soul of Kenya to the world stage.
            </p>

            {/* Music note decorative element */}
            <div className="flex items-center gap-2 text-[#708238] pt-2">
              <Music className="h-4 w-4" />
              <div className="h-[1px] w-16 bg-gradient-to-r from-[#708238] to-transparent"></div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center space-y-6">
            <h4 className="text-sm font-semibold text-[#F0FFF0] tracking-[0.3em] uppercase mb-8 relative inline-block">
              Quick Links
              <div className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#9DC183] to-transparent"></div>
            </h4>
            <nav className="flex flex-col gap-4">
              <Link
                href="/#about"
                className="text-[#9DC183]/60 hover:text-[#9DC183] transition-all duration-300 relative inline-block group text-sm font-light tracking-wide"
              >
                <span className="relative">
                  About
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1px] bg-[#9DC183] transition-all duration-300"></span>
                </span>
              </Link>
              <Link
                href="/#music"
                className="text-[#9DC183]/60 hover:text-[#9DC183] transition-all duration-300 relative inline-block group text-sm font-light tracking-wide"
              >
                <span className="relative">
                  Music
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1px] bg-[#9DC183] transition-all duration-300"></span>
                </span>
              </Link>
              <Link
                href="/events"
                className="text-[#9DC183]/60 hover:text-[#9DC183] transition-all duration-300 relative inline-block group text-sm font-light tracking-wide"
              >
                <span className="relative">
                  Events
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[1px] bg-[#9DC183] transition-all duration-300"></span>
                </span>
              </Link>
              <Link
                href="/contact"
                className="text-[#9DC183]/60 hover:text-[#9DC183] transition-all duration-300 relative inline-block group text-sm font-light tracking-wide"
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
            <h4 className="text-sm font-semibold text-[#F0FFF0] tracking-[0.3em] uppercase mb-8 relative inline-block">
              Connect
              <div className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#9DC183] to-transparent"></div>
            </h4>

            {/* Contact Info */}
            <div className="space-y-4 text-sm text-[#9DC183]/60 font-light">
              <div className="flex items-center justify-center md:justify-end gap-3 hover:text-[#9DC183] transition-colors group">
                <div className="p-2 rounded-full bg-[#708238]/10 group-hover:bg-[#708238]/20 transition-all">
                  <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:info@yaba.music" className="hover:text-[#9DC183] transition-colors">
                  info@yaba.music
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-end gap-3 group">
                <div className="p-2 rounded-full bg-[#708238]/10 group-hover:bg-[#708238]/20 transition-all">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Nairobi, Kenya</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex justify-center md:justify-end gap-3 pt-4">
              <Link
                href="https://instagram.com"
                className="group relative p-3 rounded-full border border-[#708238]/40 hover:border-[#9DC183] bg-[#708238]/10 hover:bg-[#708238]/20 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-5 w-5 text-[#9DC183]/60 group-hover:text-[#9DC183] transition-colors relative z-10" />
                <span className="sr-only">Instagram</span>
                <div className="absolute inset-0 bg-[#9DC183]/0 group-hover:bg-[#9DC183]/10 rounded-full transition-all duration-300 blur-sm"></div>
              </Link>
              <Link
                href="https://twitter.com"
                className="group relative p-3 rounded-full border border-[#708238]/40 hover:border-[#9DC183] bg-[#708238]/10 hover:bg-[#708238]/20 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="h-5 w-5 text-[#9DC183]/60 group-hover:text-[#9DC183] transition-colors relative z-10" />
                <span className="sr-only">Twitter</span>
                <div className="absolute inset-0 bg-[#9DC183]/0 group-hover:bg-[#9DC183]/10 rounded-full transition-all duration-300 blur-sm"></div>
              </Link>
              <Link
                href="https://youtube.com"
                className="group relative p-3 rounded-full border border-[#708238]/40 hover:border-[#9DC183] bg-[#708238]/10 hover:bg-[#708238]/20 transition-all duration-300 hover:scale-110"
              >
                <Youtube className="h-5 w-5 text-[#9DC183]/60 group-hover:text-[#9DC183] transition-colors relative z-10" />
                <span className="sr-only">YouTube</span>
                <div className="absolute inset-0 bg-[#9DC183]/0 group-hover:bg-[#9DC183]/10 rounded-full transition-all duration-300 blur-sm"></div>
              </Link>
              <Link
                href="https://facebook.com"
                className="group relative p-3 rounded-full border border-[#708238]/40 hover:border-[#9DC183] bg-[#708238]/10 hover:bg-[#708238]/20 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5 text-[#9DC183]/60 group-hover:text-[#9DC183] transition-colors relative z-10" />
                <span className="sr-only">Facebook</span>
                <div className="absolute inset-0 bg-[#9DC183]/0 group-hover:bg-[#9DC183]/10 rounded-full transition-all duration-300 blur-sm"></div>
              </Link>
            </div>
          </div>
        </div>

        {/* Elegant divider */}
        <div className="relative my-12">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#708238]/40 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 bg-[#9DC183] rotate-45 animate-pulse"></div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[#9DC183]/50 font-light">
          <p className="text-center md:text-left flex items-center gap-2">
            © {new Date().getFullYear()} YABA. All rights reserved.
            <span className="text-[#708238]">•</span>
            <span className="text-[#9DC183]/40">Made with rhythm & soul</span>
          </p>
          <p className="text-center md:text-right flex items-center gap-2">
            Crafted with
            <Heart className="h-3 w-3 text-[#9DC183] inline fill-[#9DC183] animate-pulse" />
            by
            <span className="text-[#F0FFF0] font-medium tracking-wider">
              Stdio<span className="text-[#9DC183]">X</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

