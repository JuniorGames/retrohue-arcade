import { useState, useRef } from 'react';
import { Globe, Play, X, ChevronDown } from 'lucide-react';

const CORES = [
  { id: '3do', name: '3DO' },
  { id: 'arcade', name: 'Arcade (MAME)' },
  { id: 'atari2600', name: 'Atari 2600' },
  { id: 'jaguar', name: 'Atari Jaguar' },
  { id: 'lynx', name: 'Atari Lynx' },
  { id: 'coleco', name: 'ColecoVision' },
  { id: 'gb', name: 'GameBoy / GameBoy Color' },
  { id: 'gba', name: 'GameBoy Advance' },
  { id: 'segaMS', name: 'Master System' },
  { id: 'segaMD', name: 'Mega Drive / Genesis' },
  { id: 'ngp', name: 'Neo Geo Pocket' },
  { id: 'nds', name: 'Nintendo DS' },
  { id: 'n64', name: 'Nintendo 64' },
  { id: 'nes', name: 'Nintendo (NES)' },
  { id: 'pcengine', name: 'PC Engine / TurboGrafx-16' },
  { id: 'psx', name: 'PlayStation 1' },
  { id: 'psp', name: 'PSP (PlayStation Portable)' },
  { id: 'segaCD', name: 'Sega CD' },
  { id: 'segaGG', name: 'Sega Game Gear' },
  { id: 'segaSaturn', name: 'Sega Saturn' },
  { id: 'snes', name: 'Super Nintendo' },
  { id: 'vb', name: 'Virtual Boy' },
  { id: 'ws', name: 'WonderSwan' },
];

const RomLinkPlayer = () => {
  const [romUrl, setRomUrl] = useState('');
  const [selectedCore, setSelectedCore] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePlay = () => {
    if (!romUrl.trim() || !selectedCore) return;
    if (selectedCore === 'psp') {
      const encodedUrl = encodeURIComponent(romUrl.trim());
      window.open(`https://demo.emulatorjs.org/#psp&${encodedUrl}`, '_blank');
      return;
    }
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  const selectedCoreName = CORES.find(c => c.id === selectedCore)?.name ?? '';

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
            <Globe className="w-6 h-6 text-primary" />
            <h2 className="font-arcade text-lg md:text-2xl text-foreground">
              <span className="text-primary">Jogos</span> via Link Online
            </h2>
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            Cole o link direto de uma ROM e jogue diretamente no navegador.
            <br />
            <span className="text-primary/70 text-xs">
              Ideal para Xbox Series/One via Edge — sem necessidade de download!
            </span>
          </p>
        </div>

        {/* Console Selector - Custom Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-arcade text-muted-foreground mb-2">
            Console / Plataforma
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`w-full h-12 rounded-xl border-2 border-primary/50 bg-black px-4 pr-10 font-arcade text-sm text-left cursor-pointer focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors ${selectedCore ? 'text-white' : 'text-muted-foreground/50'}`}
            >
              {selectedCore ? selectedCoreName : 'Escolha seu console...'}
            </button>
            <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                <ul className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-xl border-2 border-primary/50 bg-black py-1 scrollbar-thin scrollbar-thumb-primary/50">
                  {CORES.map((core) => (
                    <li
                      key={core.id}
                      onClick={() => { setSelectedCore(core.id); setDropdownOpen(false); }}
                      className={`px-4 py-2 font-arcade text-sm cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground ${selectedCore === core.id ? 'bg-primary/30 text-primary' : 'text-white'}`}
                    >
                      {core.name}
                    </li>
                  ))}
                </ul>
              </>
            )}
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
            disabled={!romUrl.trim() || !selectedCore}
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
            <span className="font-arcade text-sm text-primary">
              EmulatorJS — {selectedCoreName}
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
