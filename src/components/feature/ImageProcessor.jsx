"use client";
import { useState } from "react";
import { removeBackground } from "@imgly/background-removal";
import { Upload, Download, Loader2 } from "lucide-react";

export default function ImageProcessor() {
  const [imageSrc, setImageSrc] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setProcessedImage(null);
    }
  };

  const handleRemoveBackground = async () => {
    if (!imageSrc) return;
    setLoading(true);
    try {
      // This runs 100% in the browser (WASM)
      const blob = await removeBackground(imageSrc);
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
    } catch (error) {
      console.error("Failed to remove background:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-black border border-gray-800 rounded-xl max-w-md mx-auto">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <Upload size={20} className="text-primary" />
        Penghapus Latar Belakang (Lokal)
      </h3>

      {/* Upload Area */}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="block w-full text-sm text-gray-500 mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-black hover:file:bg-blue-400"
      />

      {/* Preview Area */}
      <div className="flex gap-2 mb-4">
        {imageSrc && (
          <img src={imageSrc} alt="Original" className="w-1/2 rounded border border-gray-700" />
        )}
        {processedImage && (
          <img src={processedImage} alt="Processed" className="w-1/2 rounded border border-primary" />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleRemoveBackground}
          disabled={!imageSrc || loading}
          className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Hapus Background"}
        </button>

        {processedImage && (
          <a
            href={processedImage}
            download="synapse-no-bg.png"
            className="flex-1 bg-primary text-black py-2 rounded flex justify-center items-center gap-2 font-bold hover:bg-blue-400"
          >
            <Download size={18} /> Simpan
          </a>
        )}
      </div>
    </div>
  );
}
