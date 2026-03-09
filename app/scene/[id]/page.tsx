"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false }
);

export default function ScenePage() {
  const params = useParams();
  const id = params.id as string;
  const [scene, setScene] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/scenes/${id}.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setScene(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-4xl animate-spin inline-block">⚡</div>
          <p className="mt-3 text-gray-500">Chargement du workflow...</p>
        </div>
      </div>
    );
  }

  if (error || !scene) {
    return (
      <div className="h-screen flex items-center justify-center bg-white text-black">
        <div className="text-center">
          <p className="text-2xl mb-2">Workflow introuvable</p>
          <p className="text-gray-500 mb-4">{error}</p>
          <Link href="/" className="text-[#e94560] underline">Retour au portail</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-white">
      {/* Top bar */}
      <div className="bg-white/95 backdrop-blur px-4 py-2.5 flex items-center justify-between border-b border-gray-200 z-50">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-extrabold bg-gradient-to-r from-[#e94560] to-[#ff6b6b] bg-clip-text text-transparent">
            Kreator
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-semibold text-sm">{scene.title || id}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-600 text-xs font-semibold">ÉDITABLE</span>
        </div>
      </div>

      {/* Excalidraw */}
      <div className="flex-1" style={{ height: "calc(100vh - 44px)" }}>
        <Excalidraw
          initialData={{
            elements: scene.elements || [],
            appState: {
              viewBackgroundColor: "#ffffff",
              theme: "light",
              currentItemFontFamily: 1,
            },
          }}
          theme="light"
          UIOptions={{
            canvasActions: {
              export: { saveFileToDisk: true },
            },
          }}
        />
      </div>
    </div>
  );
}
