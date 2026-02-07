import { Folder, FileText, Database, ShieldCheck, HardDrive, Download, Cpu, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function FileSidebar({ files }) {
  const [downloading, setDownloading] = useState(null);

  const handleDownload = (fileName) => {
    setDownloading(fileName);
    setTimeout(() => setDownloading(null), 1500);

    let content = `SECURE SYNAPSE NODE-01 DATA EXPORT\nTIMESTAMP: ${new Date().toISOString()}\n----------------------------------\n\n`;
    if (fileName.includes("report")) content += "JENIS: Laporan Analisis\nSTATUS: Final\nENKRIPSI: AES-256 GCM\n\n[ISI LAPORAN DIRAHASIAKAN]";
    else if (fileName.includes("log")) content += "JENIS: Log Sistem\nUPTIME: 99.998%\nANOMALI: 0 Terdeteksi\n\n[BEGIN LOG STREAM...]";
    else content += "JENIS: Data Generik\nVERIFIKASI: Signature Valid\n\n[CONTENT HASH: 0x4A9F...]";

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-72 bg-black/40 backdrop-blur-md border-r border-white/10 flex flex-col h-full font-mono text-xs z-10 shrink-0">

      {/* HEADER */}
      <div className="p-5 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-6 h-6 opacity-90">
            {/* FIXED: ADD SIZES PROP */}
            <Image
              src="/logo.png"
              alt="Synapse Logo"
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="text-white font-bold tracking-wider text-sm">NODE-01</h3>
            <div className="flex items-center gap-1.5 text-emerald-400 text-[10px]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              ENCRYPTED
            </div>
          </div>
        </div>

        {/* Storage Visualizer */}
        <div className="bg-black/40 p-3 rounded-lg border border-white/5">
          <div className="flex justify-between text-gray-400 mb-1 text-[10px] uppercase tracking-wider">
            <span className="flex items-center gap-1"><HardDrive size={10} /> NVMe RAID 0</span>
            <span>14GB / 2TB</span>
          </div>
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-blue-500/20 animate-pulse"></div>
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[1%] relative z-10"></div>
          </div>
        </div>
      </div>

      {/* FILE TREE */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        <div className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-2 px-2 pt-2">System Root</div>

        <div className="flex items-center gap-2 text-gray-400 p-2 hover:bg-white/5 hover:text-white rounded-lg cursor-pointer group transition-all">
          <Folder size={14} className="text-yellow-500/80 group-hover:text-yellow-400" />
          <span>/system_logs</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400 p-2 hover:bg-white/5 hover:text-white rounded-lg cursor-pointer group transition-all mb-4">
          <Database size={14} className="text-purple-500/80 group-hover:text-purple-400" />
          <span>/vectors_db</span>
        </div>

        <div className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-2 px-2 pt-2 flex justify-between items-center">
          <span>Output Stream</span>
          <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1 rounded animate-pulse">LIVE</span>
        </div>

        {/* Dynamic Files */}
        <AnimatePresence>
          {files.map((file, index) => (
            <motion.div
              key={index}
              // FIXED: ANIMATION TO SPECIFIC COLOR, NOT TRANSPARENT
              initial={{ opacity: 0, x: -10, backgroundColor: "rgba(16, 185, 129, 0.2)" }}
              animate={{ opacity: 1, x: 0, backgroundColor: "rgba(0,0,0,0)" }}
              className={`flex items-center justify-between text-gray-300 p-2 rounded-lg cursor-pointer border transition-all ${downloading === file
                  ? "bg-emerald-500/20 border-emerald-500/50"
                  : "border-transparent hover:border-blue-500/20 hover:bg-blue-500/5"
                }`}
              onClick={() => handleDownload(file)}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <FileText size={14} className={downloading === file ? "text-emerald-400" : "text-blue-500/70 group-hover:text-blue-500"} />
                <span className={`truncate text-xs transition-colors ${downloading === file ? "text-emerald-400 font-bold" : "group-hover:text-white"}`}>
                  {file}
                </span>
              </div>

              {downloading === file ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <CheckCircle size={12} className="text-emerald-400" />
                </motion.div>
              ) : (
                <Download size={12} className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-blue-500 transition-all" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-white/10 bg-white/5 text-gray-500 flex justify-between items-center text-[10px]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={12} className="text-emerald-500" />
          <span>AES-256</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-pulse"></div>
          <span>v2.4.0</span>
        </div>
      </div>
    </div>
  );
}
