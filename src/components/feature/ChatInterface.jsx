"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, Cpu, Paperclip, X, FileText, Command, Copy, Check, ChevronDown, ChevronRight, Terminal, Zap, Activity, Shield, Image as ImageIcon, BarChart2, PenTool, Eye, Download } from "lucide-react";
import FileSidebar from "./FileSidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from "framer-motion";

// --- SUB-COMPONENTS (DIPINDAHKAN KELUAR AGAR STABIL / TIDAK FLICKERING) ---

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="absolute top-2 right-2 p-1 rounded bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all">
      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
    </button>
  );
};

// Mencegah animasi ulang saat parent re-render
const ThoughtProcess = ({ thoughts, isThinking }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!thoughts || thoughts.length === 0) return null;

  return (
    <div className="mb-4 rounded-lg overflow-hidden border border-emerald-500/20 bg-emerald-900/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-4 py-2 bg-emerald-900/10 hover:bg-emerald-900/20 text-xs font-mono text-emerald-400 transition-colors"
      >
        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <Terminal size={12} />
        <span>SYNAPSE REASONING CHAIN</span>
        {isThinking && <span className="animate-pulse ml-auto text-[10px]">PROCESSING...</span>}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 py-3 space-y-1"
          >
            {thoughts.map((log, idx) => (
              <div key={idx} className="flex gap-2 text-[10px] font-mono text-emerald-500/70">
                <span className="opacity-50">[{new Date().toLocaleTimeString().split(' ')[0]}]</span><span>{">"} {log}</span>
              </div>
            ))}
            {isThinking && (
              <div className="flex gap-2 text-[10px] font-mono text-emerald-500/70 animate-pulse">
                <span className="opacity-50">...</span>
                <span className="w-2 h-4 bg-emerald-500/50 block"></span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AgentBadge = ({ agentName }) => {
  if (!agentName) return null;
  const isDoc = agentName.includes("Document");
  const isAnalyst = agentName.includes("Analyst");
  const isVision = agentName.includes("Vision");
  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase mb-2
      ${isVision ? "bg-cyan-500/20 border border-cyan-500/50 text-cyan-400" :
        isDoc ? "bg-blue-500/20 border border-blue-500/50 text-blue-400" :
          isAnalyst ? "bg-purple-500/20 border border-purple-500/50 text-purple-400" :
            "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"}`}
    >
      {isVision ? <Eye size={10} /> : isDoc ? <PenTool size={10} /> : isAnalyst ? <BarChart2 size={10} /> : <Cpu size={10} />}
      <span>{agentName}</span>
    </div>
  );
};

// Komponen Status Dokumen
const DocumentCard = ({ fileName }) => {
  return (
    <div className="mt-2 mb-4 p-3 rounded-lg bg-[#0a0a0a] border border-white/10 flex items-center justify-between max-w-sm group hover:border-emerald-500/30 transition-all">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
          <FileText size={18} />
        </div>
        <div>
          <div className="text-xs font-bold text-gray-200">{fileName}</div>
          <div className="text-[10px] text-gray-500 font-mono">READY FOR DOWNLOAD</div>
        </div>
      </div>
      <div className="p-1.5 bg-emerald-500/10 rounded-full text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all">
        <Download size={14} />
      </div>
    </div>
  );
};

const base64ToBlob = (base64, type) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  return new Blob([new Uint8Array(byteNumbers)], { type: type });
};

// --- MAIN COMPONENT ---
export default function ChatInterface() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Synapse Node-01 Online. \n\nSaya siap menganalisis data sensitif tanpa koneksi internet publik. Silakan pilih opsi Quick Action di bawah atau unggah file untuk memulai.",
      isInitial: true
    }
  ]);
  const [files, setFiles] = useState(["readme.txt", "security_audit.log"]);
  const [isLoading, setIsLoading] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [activeAgent, setActiveAgent] = useState(null);

  // Hardware State
  const [gpuLoad, setGpuLoad] = useState(12);
  const [vramUsage, setVramUsage] = useState(4.2);
  const [tps, setTps] = useState(0);
  const [power, setPower] = useState(115);

  const messagesContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const isAtBottomRef = useRef(true);

  // Smart Scroll
  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      isAtBottomRef.current = isNearBottom;
    }
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container && isAtBottomRef.current) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  // Simulasi Hardware
  useEffect(() => {
    const interval = setInterval(() => {
      setGpuLoad(prev => {
        const target = isLoading ? 92 + Math.random() * 6 : 8 + Math.random() * 3;
        return prev + (target - prev) * 0.2;
      });
      setVramUsage(prev => {
        const target = isLoading ? 24.5 + Math.random() * 0.5 : 14.2 + Math.random() * 0.1;
        return prev + (target - prev) * 0.1;
      });
      setTps(prev => {
        const target = isLoading ? 42 + Math.random() * 8 : 0;
        return isLoading ? prev + (target - prev) * 0.2 : 0;
      });
      setPower(prev => {
        const target = isLoading ? 450 + Math.random() * 40 : 120 + Math.random() * 10;
        return prev + (target - prev) * 0.1;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isLoading]);

  const generateThoughts = (prompt, agentName) => {
    const baseThoughts = [
      "Initializing secure handshake...",
      "Verifying user intent...",
      "Scanning local vector database...",
    ];
    if (agentName?.includes("Vision")) baseThoughts.push("Activating Vision Core...");
    else if (agentName?.includes("Document")) baseThoughts.push("Routing to Document Writer...");
    else if (agentName?.includes("Analyst")) baseThoughts.push("Routing to Data Analyst...");
    else baseThoughts.push("Retrieving context from memory...");

    baseThoughts.push("Finalizing output stream.");
    return baseThoughts;
  };

  const simulateStreaming = async (fullText, inputPrompt, agentName, generatedFile = null) => {
    const thoughts = generateThoughts(inputPrompt, agentName);

    isAtBottomRef.current = true;

    setMessages(prev => [...prev, {
      role: "assistant",
      content: "",
      thoughts: [],
      isThinking: true,
      agent: agentName,
      file: generatedFile
    }]);

    // Thinking Phase
    for (let i = 0; i < thoughts.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setMessages(prev => {
        const newMsg = [...prev];
        const lastMsg = newMsg[newMsg.length - 1];
        if (lastMsg && lastMsg.thoughts) lastMsg.thoughts = [...lastMsg.thoughts, thoughts[i]];
        return newMsg;
      });
    }

    setMessages(prev => {
      const newMsg = [...prev];
      if (newMsg[newMsg.length - 1]) newMsg[newMsg.length - 1].isThinking = false;
      return newMsg;
    });

    // Typing Phase
    const chunks = fullText.split(" ");
    let currentText = "";

    for (let i = 0; i < chunks.length; i++) {
      const delay = Math.floor(Math.random() * 20) + 20;
      await new Promise(resolve => setTimeout(resolve, delay));
      currentText += chunks[i] + " ";
      setMessages(prev => {
        const newMsg = [...prev];
        if (newMsg[newMsg.length - 1]) newMsg[newMsg.length - 1].content = currentText;
        return newMsg;
      });
    }
    setIsLoading(false);
  };

  const handleSend = async (manualInput = null) => {
    const textToSend = manualInput || input;
    if (!textToSend.trim() && !attachment) return;

    let requestBody = {
      message: textToSend,
      history: messages.filter(m => !m.isInitial).map(m => ({ role: m.role, content: m.content }))
    };

    if (attachment) {
      if (attachment.category === "image") {
        requestBody.image = attachment.content;
        requestBody.message = textToSend || "Analisis gambar ini.";
      } else {
        requestBody.message = `[FILE: ${attachment.name}]\n${attachment.content}\n\nREQ: ${textToSend}`;
      }
    }

    // [FIXED] EMOJI RUSAK DIPERBAIKI
    const displayContent = attachment
      ? `📂 Mengunggah ${attachment.category === 'image' ? 'Gambar' : 'File'}: **${attachment.name}**\n\n${textToSend}`
      : textToSend;

    isAtBottomRef.current = true;
    setMessages((prev) => [...prev, { role: "user", content: displayContent }]);
    setInput("");
    setAttachment(null);
    setIsLoading(true);
    setActiveAgent("Orchestrator");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json();
      const agentName = data.agent || "Synapse Node";
      setActiveAgent(agentName);
      let rawResponse = data.response || "No response";

      if (data.generatedFile) {
        setFiles(prev => [...prev, data.generatedFile.name]);
        const blob = base64ToBlob(data.generatedFile.content, data.generatedFile.type);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = data.generatedFile.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // [FIXED] EMOJI RUSAK & PESAN STATUS DIPERBAIKI
        rawResponse += `\n\n✅ *[File **${data.generatedFile.name}** berhasil dibuat & diunduh]*`;
      }

      await new Promise(r => setTimeout(r, 500));
      await simulateStreaming(rawResponse.trim(), textToSend, agentName, data.generatedFile);

    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error: Koneksi Node Terputus." }]);
      setIsLoading(false);
    } finally {
      setTimeout(() => setActiveAgent(null), 3000);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileType = file.type.startsWith("image/") ? "image" : "text";
      setAttachment({
        name: file.name,
        content: event.target.result,
        type: file.type,
        category: fileType
      });
    };
    if (file.type.startsWith("image/")) reader.readAsDataURL(file);
    else reader.readAsText(file);
  };

  const removeAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex h-[750px] w-full max-w-6xl bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-0 pointer-events-none bg-[length:100%_4px,6px_100%] opacity-20"></div>

      <FileSidebar files={files} />

      <div className="flex-1 flex flex-col relative z-10">

        {/* HEADER */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
              <span className="text-gray-200 font-bold tracking-wide text-sm font-mono">NODE-01</span>
            </div>

            <div className="hidden md:flex gap-4 px-4 border-l border-white/10">
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 font-mono uppercase">GPU</span>
                <div className="flex items-end gap-1">
                  <span className={`text-xs font-bold font-mono ${isLoading ? 'text-red-400' : 'text-emerald-400'}`}>{gpuLoad.toFixed(0)}%</span>
                  <div className="w-8 h-1.5 bg-gray-800 rounded-sm overflow-hidden flex items-end mb-1">
                    <motion.div animate={{ width: `${gpuLoad}%` }} className={`h-full ${isLoading ? 'bg-red-500' : 'bg-emerald-500'}`} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 font-mono uppercase">VRAM</span>
                <div className="flex items-end gap-1">
                  <span className="text-xs font-bold font-mono text-blue-400">{vramUsage.toFixed(1)}G</span>
                  <div className="w-8 h-1.5 bg-gray-800 rounded-sm overflow-hidden flex items-end mb-1">
                    <motion.div animate={{ width: `${(vramUsage / 32) * 100}%` }} className="h-full bg-blue-500" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col border-l border-white/5 pl-4">
                <span className="text-[9px] text-gray-500 font-mono uppercase">SPEED</span>
                <div className="flex items-end gap-1">
                  <span className={`text-xs font-bold font-mono ${tps > 0 ? 'text-yellow-400' : 'text-gray-600'}`}>
                    {tps.toFixed(1)} <span className="text-[9px]">T/s</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 font-mono uppercase">POWER</span>
                <div className="flex items-end gap-1">
                  <span className={`text-xs font-bold font-mono ${power > 300 ? 'text-orange-400' : 'text-gray-500'}`}>
                    {power.toFixed(0)} <span className="text-[9px]">W</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AnimatePresence>
              {activeAgent && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <AgentBadge agentName={activeAgent === "Orchestrator" ? "ROUTING..." : activeAgent} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* MESSAGES */}
        <div ref={messagesContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {messages.map((m, i) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : "flex-row"} group`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-lg border border-white/10 ${m.role === "user" ? "bg-gradient-to-br from-blue-600 to-blue-500 text-white" : "bg-gradient-to-br from-gray-800 to-gray-900 text-emerald-400"}`}>
                {m.role === "user" ? <div className="font-bold text-[10px]">YOU</div> : <Bot size={18} />}
              </div>
              <div className={`max-w-[85%] rounded-2xl p-5 shadow-sm ${m.role === "user" ? "bg-blue-500/10 border border-blue-500/20 text-white rounded-tr-sm backdrop-blur-sm" : "bg-white/5 border border-white/10 text-gray-300 rounded-tl-sm backdrop-blur-md"}`}>

                {m.role === "assistant" && m.agent && <AgentBadge agentName={m.agent} />}
                {m.role === "assistant" && <ThoughtProcess thoughts={m.thoughts} isThinking={m.isThinking} />}
                {m.role === "assistant" && m.file && <DocumentCard fileName={m.file.name} />}

                <div className="prose prose-invert prose-sm max-w-none text-sm font-sans leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <div className="relative group/code mt-4 mb-4 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                          <div className="bg-[#1e1e1e] px-4 py-1.5 flex justify-between items-center border-b border-white/5">
                            <span className="text-[10px] font-mono text-gray-400 uppercase">{match[1]}</span>
                            <CopyButton text={String(children).replace(/\n$/, '')} />
                          </div>
                          <SyntaxHighlighter {...props} style={vscDarkPlus} language={match[1]} PreTag="div" customStyle={{ margin: 0, padding: '1.5rem', background: '#0d0d0d', fontSize: '12px' }}>
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        </div>
                      ) : <code {...props} className="bg-white/10 text-blue-500 px-1 py-0.5 rounded font-mono text-[13px]">{children}</code>
                    }
                  }}>{m.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 ml-12">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span></span>
              <span className="text-blue-500/70 text-xs font-mono tracking-widest animate-pulse">INITIATING INFERENCE...</span>
            </motion.div>
          )}
        </div>

        {/* INPUT AREA */}
        <div className="p-5 bg-white/[0.02] border-t border-white/10 backdrop-blur-md">
          {!isLoading && !input && !attachment && (
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none">
              {/* [FIXED] EMOJI RUSAK PADA TOMBOL QUICK ACTION DIPERBAIKI */}
              <button onClick={() => handleSend("🛡️ Lakukan Audit Log Keamanan")} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 hover:border-emerald-500/50 hover:text-emerald-400 transition-all whitespace-nowrap"><Shield size={12} /> Audit Security</button>
              <button onClick={() => handleSend("📊 Analisis ROI Server Lokal vs Cloud")} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 hover:border-blue-500/50 hover:text-blue-400 transition-all whitespace-nowrap"><Activity size={12} /> Analisis ROI</button>
              <button onClick={() => handleSend("📝 Buat Script Python untuk Network Scan")} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 hover:border-purple-500/50 hover:text-purple-400 transition-all whitespace-nowrap"><Terminal size={12} /> Generate Script</button>
            </div>
          )}
          <AnimatePresence>
            {attachment && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                className={`flex items-center gap-3 mb-4 w-fit px-4 py-2 rounded-lg border text-xs 
                  ${attachment.category === 'image'
                    ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-200'
                    : 'bg-blue-500/10 border-blue-500/20 text-blue-200'}`}>
                {attachment.category === 'image' ? <ImageIcon size={16} /> : <FileText size={16} />}
                <span className="font-mono font-bold">{attachment.name}</span>
                {attachment.category === 'image' && <span className="text-cyan-400/60 text-[10px]">VISION MODE</span>}
                <button onClick={removeAttachment} className="hover:text-white ml-2"><X size={14} /></button>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex gap-3 relative">
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept=".txt,.csv,.log,.json,.xml,image/*" className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white px-4 rounded-xl transition-all flex items-center justify-center"><Paperclip size={18} /></button>
            <div className="flex-1 relative">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()} placeholder={attachment ? "Instruksi..." : "Perintah..."} disabled={isLoading} className="w-full bg-black/40 border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 font-sans text-sm transition-all placeholder:text-gray-600 pl-10" />
              <Command size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            </div>
            <button onClick={() => handleSend()} disabled={isLoading || (!input.trim() && !attachment)} className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-black font-bold px-6 rounded-xl transition-all flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]"><Send size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
