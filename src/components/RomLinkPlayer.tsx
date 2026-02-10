import { useState, useRef } from 'react';
import { Globe, Play, X, ChevronDown } from 'lucide-react';

const CORES = [
  { id: 'psp', name: 'PSP (PlayStation Portable)' },
  { id: 'psx', name: 'PlayStation 1' },
  { id: 'n64', name: 'Nintendo 64' },
  { id: 'snes', name: 'Super Nintendo' },
  { id: 'nes', name: 'Nintendo (NES)' },
  { id: 'gba', name: 'GameBoy Advance' },
  { id: 'gb', name: 'GameBoy / GameBoy Color' },
  { id: 'segaMD', name: 'Mega Drive / Genesis' },
  { id: 'segaMS', name: 'Master System' },
  { id: 'atari2600', name: 'Atari 2600' },
  { id: 'arcade', name: 'Arcade (MAME)' },
  { id: 'nds', name: 'Nintendo DS' },
  { id: '3do', name: '3DO' },
  { id: 'jaguar', name: 'Atari Jaguar' },
  { id: 'lynx', name: 'Atari Lynx' },
  { id: 'segaGG', name: 'Sega Game Gear' },
  { id: 'segaSaturn', name: 'Sega Saturn' },
  { id: 'segaCD', name: 'Sega CD' },
  { id: 'coleco', name: 'ColecoVision' },
  { id: 'pcengine', name: 'PC Engine / TurboGrafx-16' },
  { id: 'ngp', name: 'Neo Geo Pocket' },
  { id: 'vb', name: 'Virtual Boy' },
  { id: 'ws', name: 'WonderSwan' },
];

const RomLinkPlayer = () => {
  const [romUrl, setRomUrl] = useState('');
  const [selectedCore, setSelectedCore] = useState('psp');
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePlay = () => {
    if (!romUrl.trim()) return;
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  const emulatorHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #000; overflow: hidden; }
    #game { width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <div id="game"></div>
  <script>
    EJS_player = '#game';
    EJS_core = '${selectedCore}';
    EJS_gameUrl = '${romUrl.trim()}';
    EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
  </script>
  <script src="https://cdn.emulatorjs.org/stable/data/loader.js"></script>
</body>
</html>`;

  return (
    <section className="container mx-auto px-4 py-8 relative z-10">
      <div className="card-retro rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Globe className="w-6 h-6 text-neon-cyan" />
            <h2 className="font-arcade text-lg md:text-2xl text-foreground">
              <span className="text-neon-cyan">Jogos</span> via Link Online
            </h2>
            <Globe className="w-6 h-6 text-neon-cyan" />
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            Cole o link direto de uma ROM e jogue diretamente no navegador.
            <br />
            <span className="text-neon-cyan/70 text-xs">
              Ideal para Xbox Series/One via Edge — sem necessidade de download!
            </span>
          </p>
        </div>

        {/* Console Selector */}
        <div className="mb-4">
          <label className="block text-sm font-arcade text-muted-foreground mb-2">
            Console / Plataforma
          </label>
          <div className="relative">
            <select
              value={selectedCore}
              onChange={(e) => setSelectedCore(e.target.value)}
              className="w-full h-12 rounded-xl border-2 border-border bg-secondary/50 text-foreground px-4 pr-10 font-arcade text-sm appearance-none cursor-pointer focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors"
            >
              {CORES.map((core) => (
                <option key={core.id} value={core.id}>
                  {core.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* URL Input + Play */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            value={romUrl}
            onChange={(e) => setRomUrl(e.target.value)}
            placeholder="Cole o link direto da ROM aqui..."
            className="flex-1 h-14 rounded-xl border-2 border-border bg-secondary/50 text-foreground px-4 font-mono text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            onKeyDown={(e) => e.key === 'Enter' && handlePlay()}
          />
          <button
            onClick={handlePlay}
            disabled={!romUrl.trim()}
            className="btn-arcade h-14 px-8 rounded-xl flex items-center justify-center gap-2 text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            <Play className="w-5 h-5" />
            JOGAR
          </button>
        </div>

        {/* Tip */}
        <p className="text-muted-foreground/60 text-xs mt-3 text-center">
          Suporte: archive.org, Google Drive (link direto), MediaFire e outros hosts com link direto para o arquivo.
        </p>
      </div>

      {/* Fullscreen Emulator Overlay */}
      {isPlaying && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
            <span className="font-arcade text-sm text-neon-cyan">
              EmulatorJS — {CORES.find(c => c.id === selectedCore)?.name}
            </span>
            <button
              onClick={handleClose}
              className="flex items-center gap-1 text-destructive hover:text-destructive/80 transition-colors"
            >
              <X className="w-5 h-5" />
              <span className="font-arcade text-xs">FECHAR</span>
            </button>
          </div>
          <iframe
            ref={iframeRef}
            srcDoc={emulatorHtml}
            className="flex-1 w-full border-none"
            allow="autoplay; gamepad; fullscreen"
            allowFullScreen
            title="EmulatorJS Player"
          />
        </div>
      )}
    </section>
  );
};

export default RomLinkPlayer;
