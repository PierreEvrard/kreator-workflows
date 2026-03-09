import Link from "next/link";

interface Scene {
  id: string;
  title: string;
  description: string;
  module: number;
}

async function getScenes(): Promise<Scene[]> {
  const fs = await import("fs/promises");
  const path = await import("path");
  const file = path.join(process.cwd(), "public", "scenes", "index.json");
  const data = await fs.readFile(file, "utf-8");
  return JSON.parse(data);
}

export default async function Home() {
  const scenes = await getScenes();

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-12 px-6 text-center border-b border-white/10">
        <span className="inline-block bg-[#e94560]/15 text-[#e94560] px-3 py-1 rounded-full text-sm font-semibold border border-[#e94560]/30 mb-4">
          🚀 Bootcamp 2026
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#e94560] to-[#ff6b6b] bg-clip-text text-transparent">
          Kreator Bootcamp
        </h1>
        <p className="text-[#8892b0] mt-3 max-w-xl mx-auto text-lg">
          Workflows visuels interactifs pour chaque module. Ouvre, explore, modifie.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-xl font-bold text-[#ccd6f6] mb-6 flex items-center gap-3">
          📋 Modules de formation
          <span className="flex-1 h-px bg-white/10" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenes.map((scene) => (
            <Link
              key={scene.id}
              href={`/scene/${scene.id}`}
              className="group block bg-[#1a1a2e] border border-white/[0.08] rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-[#e94560]/40 hover:shadow-[0_8px_32px_rgba(233,69,96,0.15)] transition-all"
            >
              <div className="h-44 bg-[#111] flex items-center justify-center text-5xl">
                ⚡
              </div>
              <div className="p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#e94560] mb-1">
                  Module {scene.module}
                </div>
                <div className="text-lg font-bold text-[#ccd6f6] mb-2">
                  {scene.title}
                </div>
                <p className="text-sm text-[#8892b0] leading-relaxed mb-4">
                  {scene.description}
                </p>
                <div className="bg-[#e94560] text-white text-center py-2.5 rounded-lg font-semibold text-sm group-hover:bg-[#d63851] transition-colors">
                  ✏️ Ouvrir le workflow
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="text-center py-8 text-[#4a5568] text-sm border-t border-white/5">
        Kreator Bootcamp 2026 — Workflows générés par IA ⚡
      </footer>
    </main>
  );
}
