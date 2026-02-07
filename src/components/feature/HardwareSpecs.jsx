"use client";

import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, ReferenceLine
} from 'recharts';
import { Server, ShieldCheck, Check, Box, Cpu, Zap, Activity, TrendingUp } from "lucide-react";

export default function HardwareSpecs() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // DATA 1: Perbandingan Harga API 2026 (Input + Output per 1M Token)
  // Sumber: Developer Docs Feb 2026
  const apiPricingData = [
    { name: 'Synapse (Local)', cost: 0.10, fill: '#10b981' }, // Listrik Only
    { name: 'Llama 4 API', cost: 1.12, fill: '#6366f1' }, // $0.27 + $0.85
    { name: 'Gemini 3 Pro', cost: 14.00, fill: '#f59e0b' }, // $2.00 + $12.00
    { name: 'GPT-5.2', cost: 15.75, fill: '#3b82f6' }, // $1.75 + $14.00
    { name: 'Claude 4.5', cost: 30.00, fill: '#8b5cf6' }, // $5.00 + $25.00
  ];

  // DATA 2: Analisis ROI (Power User: 100M token/bulan)
  // Cloud (GPT-5.2): ~$800/bulan (Linear)
  // Local (Dual 5090): $7,500 Upfront + $100/bulan (Listrik/Maintenance)
  const roiData = [
    { month: 'Bulan 1', cloud: 800, local: 7600 },
    { month: 'Bulan 3', cloud: 2400, local: 7800 },
    { month: 'Bulan 6', cloud: 4800, local: 8100 },
    { month: 'Bulan 9', cloud: 7200, local: 8400 },
    { month: 'Bulan 11', cloud: 8800, local: 8600 }, // BREAK EVEN POINT
    { month: 'Bulan 12', cloud: 9600, local: 8700 }, // Local Profit Zone
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-gray-800 p-3 rounded-lg shadow-2xl backdrop-blur-md text-xs font-mono">
          <p className="text-gray-400 mb-1">{label}</p>
          <p className="text-white font-bold text-sm">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!isMounted) return <div className="h-96 flex items-center justify-center text-gray-500">Loading Market Data...</div>;

  return (
    <section id="hardware" className="py-24 px-6 bg-[#050505] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

      <div className="max-w-7xl mx-auto">

        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Infrastruktur AI <span className="text-emerald-500">Era 2026</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Industri telah berubah. Model "Frontier" seperti GPT-5.2 dan Claude 4.5 kini menerapkan biaya tinggi untuk <em>Reasoning Tokens</em>.
              Layanan kami membangun infrastruktur lokal berbasis <strong>NVIDIA Blackwell (RTX 50-series)</strong> yang memberikan performa setara dengan privasi total dan ROI dalam 11 bulan.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
              <Activity size={14} />
              DATA PASAR FEB 2026
            </div>
            <div className="text-[10px] text-gray-500 text-right max-w-[200px]">
              *Sumber: OpenAI Pricing Docs, TechPowerUp GPU Database, Meta AI Whitepaper.
            </div>
          </div>
        </div>

        {/* --- CHARTS SECTION (Minimalist Glass) --- */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">

          {/* Chart 1: Cost Comparison */}
          <div className="md:col-span-1 bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                  <Zap size={16} className="text-blue-500" />
                  Biaya per 1 Juta Token
                </h3>
                <p className="text-[10px] text-gray-500 mt-1">Input + Output Blended Price</p>
              </div>
            </div>

            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={apiPricingData} layout="vertical" margin={{ left: 0, right: 35 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" stroke="#666" fontSize={10} width={90} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                  <Bar dataKey="cost" radius={[0, 4, 4, 0]} barSize={24} background={{ fill: '#ffffff05' }}>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-[10px] text-red-400 leading-snug">
                <strong>Peringatan Biaya:</strong> Claude 4.5 Opus mengenakan biaya $30/1M token karena "Internal Reasoning". Lokal hampir gratis.
              </p>
            </div>
          </div>

          {/* Chart 2: TCO Analysis */}
          <div className="md:col-span-2 bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                  <TrendingUp size={16} className="text-emerald-500" />
                  Analisis ROI (12 Bulan)
                </h3>
                <p className="text-[10px] text-gray-500 mt-1">Skenario Power User: 100 Juta Token/Bulan</p>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-2xl font-mono font-bold text-white">$9,600</p>
                <p className="text-[10px] text-gray-500">Biaya Cloud Tahunan</p>
              </div>
            </div>

            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={roiData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCloud" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorLocal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="month" stroke="#444" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#444" fontSize={10} tickFormatter={(value) => `$${value}`} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="cloud" stroke="#ef4444" fillOpacity={1} fill="url(#colorCloud)" strokeWidth={2} name="Cloud (GPT-5.2)" />
                  <Area type="monotone" dataKey="local" stroke="#10b981" fillOpacity={1} fill="url(#colorLocal)" strokeWidth={2} name="Local (Dual 5090)" />
                  {/* Break Even Line */}
                  <ReferenceLine x="Bulan 11" stroke="white" strokeDasharray="3 3" label={{ position: 'top', value: 'BEP', fill: 'white', fontSize: 10 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-emerald-400 mt-2 text-center">
              *Titik balik modal (Break Even Point) tercapai di Bulan ke-11. Tahun ke-2 adalah profit murni.
            </p>
          </div>
        </div>

        {/* --- NODE CONFIGURATION TIERS (Detailed Specs) --- */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-8">
            <Server className="text-blue-500" />
            <h3 className="text-xl font-bold text-white">
              Layanan Rakitan Node (Custom Build Service)
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* TIER 1: ENTRY */}
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-6 flex flex-col hover:border-gray-700 transition-all group relative overflow-hidden">
              <div className="mb-4 relative z-10">
                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Tier 1</span>
                <h4 className="text-xl font-bold text-white mt-1">Smart Entry Build</h4>
                <p className="text-xs text-gray-400 mt-2 min-h-[40px]">
                  Fokus pada "Price-per-GB VRAM". Solusi hemat untuk menjalankan Llama 3.1 8B atau Qwen 2.5 14B.
                </p>
              </div>
              <div className="text-3xl font-mono text-white mb-6 tracking-tight">~$1,269 <span className="text-sm text-gray-600 font-sans font-normal">est.</span></div>

              <div className="space-y-4 flex-1 relative z-10">
                <div className="bg-black/40 p-3 rounded-lg border border-gray-800/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Cpu size={16} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-300">RTX 5070 Ti (16GB GDDR7)</span>
                  </div>
                  <div className="text-[10px] text-gray-500 space-y-1">
                    <p>• Alt: Used RTX 3090 (24GB)</p>
                    <p>• Ryzen 7600 + 32GB DDR5</p>
                    <p>• Speed: ~120 tokens/sec</p>
                  </div>
                </div>

                <div className="text-xs text-gray-400 space-y-2 pt-2 border-t border-gray-800/50">
                  <p className="font-bold text-gray-300 mb-1 flex items-center gap-2"><Box size={12} /> Service Kami:</p>
                  <div className="flex items-start gap-2"><Check size={12} className="text-emerald-500 mt-0.5" /> <span>Perakitan & Optimasi Driver</span></div>
                  <div className="flex items-start gap-2"><Check size={12} className="text-emerald-500 mt-0.5" /> <span>Setup Ollama / LM Studio</span></div>
                </div>
              </div>

              <button className="w-full mt-6 py-3 border border-gray-700 hover:bg-white hover:text-black hover:border-white text-white rounded-xl text-xs font-bold transition-all relative z-10">
                REQ SPESIFIKASI INI
              </button>
            </div>

            {/* TIER 2: PRO (Highlighted) */}
            <div className="bg-[#111] border border-blue-500/30 rounded-2xl p-6 flex flex-col relative shadow-[0_0_40px_rgba(59,130,246,0.05)] transform md:-translate-y-4 z-10">
              <div className="absolute top-0 right-0 bg-blue-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                RTX 5090 ERA
              </div>
              <div className="mb-4">
                <span className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">Tier 2</span>
                <h4 className="text-xl font-bold text-white mt-1">Prosumer Powerhouse</h4>
                <p className="text-xs text-gray-400 mt-2 min-h-[40px]">
                  Menjalankan model "Frontier-Lite" (70B) dengan kecepatan baca manusia. Opsi terbaik 2026.
                </p>
              </div>
              <div className="text-3xl font-mono text-white mb-6 tracking-tight">~$4,800 <span className="text-sm text-gray-600 font-sans font-normal">est.</span></div>

              <div className="space-y-4 flex-1">
                <div className="bg-blue-500/5 p-3 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Cpu size={16} className="text-blue-500" />
                    <span className="text-xs font-bold text-white">NVIDIA RTX 5090 (32GB)</span>
                  </div>
                  <div className="text-[10px] text-gray-400 space-y-1">
                    <p>• GDDR7 Memory (1.5 TB/s)</p>
                    <p>• Performa: ~3,352 AI TOPS</p>
                    <p>• Opsi B: Mac Studio M4 Max (128GB)</p>
                  </div>
                </div>

                <div className="text-xs text-gray-400 space-y-2 pt-2 border-t border-gray-800/50">
                  <p className="font-bold text-white mb-1 flex items-center gap-2"><Box size={12} /> Service Kami:</p>
                  <div className="flex items-start gap-2"><Check size={12} className="text-blue-500 mt-0.5" /> <span>Instalasi Llama 4 (70B) 4-bit</span></div>
                  <div className="flex items-start gap-2"><Check size={12} className="text-blue-500 mt-0.5" /> <span>RAG Pipeline Setup (Vector DB)</span></div>
                  <div className="flex items-start gap-2"><Check size={12} className="text-blue-500 mt-0.5" /> <span>Garansi Tuning Performa</span></div>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-blue-500 hover:bg-blue-600 text-black rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-900/20">
                BANGUN TIER 2
              </button>
            </div>

            {/* TIER 3: ENTERPRISE */}
            <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-6 flex flex-col hover:border-purple-500/50 transition-all group">
              <div className="mb-4">
                <span className="text-[10px] font-bold tracking-widest text-purple-500 uppercase">Tier 3</span>
                <h4 className="text-xl font-bold text-white mt-1">Enterprise Cluster</h4>
                <p className="text-xs text-gray-400 mt-2 min-h-[40px]">
                  Bukan lagi PC, ini adalah Data Center Mini. Untuk menjalankan Llama 4 Maverick (400B).
                </p>
              </div>
              <div className="text-3xl font-mono text-white mb-6 tracking-tight">$10,000+ <span className="text-sm text-gray-600 font-sans font-normal">custom</span></div>

              <div className="space-y-4 flex-1">
                <div className="bg-purple-900/10 p-3 rounded-lg border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Server size={16} className="text-purple-400" />
                    <span className="text-xs font-bold text-purple-100">Dual RTX 5090 / Mac Ultra</span>
                  </div>
                  <div className="text-[10px] text-gray-400 space-y-1">
                    <p>• Total VRAM: 64GB - 512GB</p>
                    <p>• CPU: Threadripper 7000 / M4 Ultra</p>
                    <p>• Context: Up to 1M Tokens</p>
                  </div>
                </div>

                <div className="text-xs text-gray-400 space-y-2 pt-2 border-t border-gray-800/50">
                  <p className="font-bold text-gray-300 mb-1 flex items-center gap-2"><Box size={12} /> Service Kami:</p>
                  <div className="flex items-start gap-2"><Check size={12} className="text-purple-500 mt-0.5" /> <span>Arsitektur Sistem Multi-GPU</span></div>
                  <div className="flex items-start gap-2"><Check size={12} className="text-purple-500 mt-0.5" /> <span>Fine-Tuning (QLoRA) Setup</span></div>
                  <div className="flex items-start gap-2"><Check size={12} className="text-purple-500 mt-0.5" /> <span>Integrasi API Internal Perusahaan</span></div>
                </div>
              </div>

              <button className="w-full mt-6 py-3 border border-gray-700 hover:bg-purple-500 hover:text-white hover:border-purple-500 text-white rounded-xl text-xs font-bold transition-all">
                KONSULTASI PROJECT
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
