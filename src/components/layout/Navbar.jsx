"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-lg border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Synapse AI"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-white font-bold tracking-tight text-lg">
            SYNAPSE<span className="text-primary">.AI</span>
          </span>
        </Link>

        {/* MENU LINKS (Clean Typography) */}
        <div className="hidden md:flex gap-10 text-xs font-medium text-gray-400 tracking-wide">
          <Link href="#features" className="hover:text-white transition-colors">SOLUSI</Link>
          <Link href="#hardware" className="hover:text-white transition-colors">INFRASTRUKTUR</Link>
          <Link href="#demo" className="hover:text-white transition-colors">LIVE DEMO</Link>
        </div>

        {/* CTA BUTTON (Minimalist Outline) */}
        <button className="hidden md:flex items-center gap-2 bg-white/5 hover:bg-white text-white hover:text-black px-5 py-2.5 rounded-full text-xs font-bold border border-white/10 hover:border-white transition-all duration-300 group">
          AKSES AWAL
          <ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
        </button>
      </div>
    </nav>
  );
}
