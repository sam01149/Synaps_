"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatInterface from "@/components/feature/ChatInterface";
import HardwareSpecs from "@/components/feature/HardwareSpecs";
import { Shield, Zap, Lock, ChevronRight, Activity, Cpu, Server } from "lucide-react";
import { motion } from "framer-motion";

// Animasi Fade Up yang Halus
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 relative overflow-hidden">
      <Navbar />

      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10" />

      {/* 1. HERO SECTION (KEMBALI KE JUDUL LAMA YANG ELEGAN) */}
      <section className="relative pt-40 pb-32 px-6 max-w-7xl mx-auto text-center z-10 flex flex-col items-center">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {/* Badge Status (Kembali ke System Operational) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-emerald-400 text-xs font-mono mb-8 hover:bg-white/10 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            SYSTEM OPERATIONAL: JAKARTA NODE-01
          </div>

          {/* Headline Besar (Kembali ke Versi Enterprise) */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500">
              Kecerdasan Enterprise.
            </span>
            <br />
            <span className="text-white">Di Hardware Anda.</span>
          </h1>

          {/* Subheadline (Kembali ke Versi Kedaulatan Data) */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Deploy agen AI otonom di balik firewall perusahaan.
            <span className="text-gray-200 font-medium"> 100% Kedaulatan Data.</span>
            Tanpa latensi cloud. Tanpa biaya per token.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#demo"
              className="group bg-white text-black hover:bg-gray-200 font-bold px-8 py-4 rounded-full text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              JALANKAN DEMO
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#hardware"
              className="px-8 py-4 rounded-full text-sm font-bold border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all text-white backdrop-blur-sm flex items-center gap-2"
            >
              <Cpu size={16} />
              LIHAT INFRASTRUKTUR
            </a>
          </div>
        </motion.div>
      </section>

      {/* 2. FEATURES GRID (Tetap menggunakan desain Glassmorphism terbaru) */}
      <section id="features" className="py-24 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-[#080808] border border-white/5 hover:border-emerald-500/30 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                <Shield className="text-emerald-500" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Sovereign Intelligence</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Data R&D perusahaan Anda tidak boleh melatih model publik. Dengan Node Lokal, data tidak pernah meninggalkan gedung (Air-Gapped Ready).
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-[#080808] border border-white/5 hover:border-blue-500/30 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                <Zap className="text-blue-500" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Inference Tanpa Meteran</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Lupakan tagihan $15.75 per juta token. Jalankan Llama 4 70B sepuasnya 24/7 hanya dengan biaya listrik (~$0.10).
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-[#080808] border border-white/5 hover:border-purple-500/30 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                <Server className="text-purple-500" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Dedicated Throughput</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tidak ada "Rate Limit" atau antrian saat jam sibuk. Bandwidth GDDR7 1.5 TB/s sepenuhnya milik tim Anda.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. HARDWARE SPECS (Component Data 2026 Terbaru) */}
      <HardwareSpecs />

      {/* 4. LIVE DEMO SECTION */}
      <section id="demo" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full -z-10" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Neural Link
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Uji Kapabilitas Node</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Interaksi langsung dengan agen Llama-3.3 yang berjalan di simulasi node lokal.
            Coba minta: <strong>"Buatkan analisis ROI server lokal vs cloud."</strong>
          </p>
        </motion.div>

        {/* CHAT INTERFACE EMBED */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <ChatInterface />
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
