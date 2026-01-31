import { Search, Gamepad2, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
    // Music would be controlled here
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="relative">
              <img 
                src="https://rahuehue-online.pages.dev/docs/huehue.png" 
                alt="HueHue"
                className="w-10 h-10 md:w-12 md:h-12 object-contain animate-float"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-arcade text-lg md:text-xl font-bold text-primary text-glow-sm">
                RetroGames
              </h1>
              <p className="text-[10px] md:text-xs text-muted-foreground font-arcade">
                HueHue
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar jogos ou consoles..."
                className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg 
                         text-sm text-foreground placeholder:text-muted-foreground
                         focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                         transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <button
              onClick={toggleMusic}
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              title={isMusicPlaying ? 'Pausar música' : 'Tocar música'}
            >
              {isMusicPlaying ? (
                <Volume2 className="w-5 h-5 text-primary" />
              ) : (
                <VolumeX className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            
            <a
              href="https://rahuehue-online.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 btn-arcade rounded-lg text-sm"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Emulador</span>
            </a>

            <img 
              src="https://rahuehue-online.pages.dev/docs/jr.png" 
              alt="Junior Games"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
