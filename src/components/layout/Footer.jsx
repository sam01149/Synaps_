"use client";

import Image from "next/image";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-900 bg-[#020202] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative w-6 h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <span className="text-gray-200 font-bold tracking-tight text-sm">SYNAPSE AI</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed mb-6">
              Membangun infrastruktur kecerdasan buatan yang berdaulat, aman, dan privat untuk masa depan industri Indonesia.
            </p>
            <div className="flex gap-4 text-gray-500">
              <Github size={18} className="hover:text-white cursor-pointer transition-colors" />
              <Twitter size={18} className="hover:text-white cursor-pointer transition-colors" />
              <Linkedin size={18} className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-bold text-xs mb-6 uppercase tracking-wider">Produk</h4>
            <ul className="space-y-4 text-xs text-gray-500 font-medium">
              <li className="hover:text-primary cursor-pointer transition-colors">Local Hardware Nodes</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Enterprise LLM</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Synapse OS</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Security Audit</li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-bold text-xs mb-6 uppercase tracking-wider">Perusahaan</h4>
            <ul className="space-y-4 text-xs text-gray-500 font-medium">
              <li className="hover:text-primary cursor-pointer transition-colors">Tentang Kami</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Karir <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded ml-1">HIRING</span></li>
              <li className="hover:text-primary cursor-pointer transition-colors">Blog</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Hubungi Sales</li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-bold text-xs mb-6 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-4 text-xs text-gray-500 font-medium">
              <li className="hover:text-primary cursor-pointer transition-colors">Kebijakan Privasi</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Syarat & Ketentuan</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Kepatuhan UU PDP</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-600">
            &copy; 2026 PT Synapse Teknologi Indonesia. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] text-emerald-500 font-mono">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
