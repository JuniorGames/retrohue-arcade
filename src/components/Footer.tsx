import { Heart, Gamepad2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <img 
              src="https://rahuehue-online.pages.dev/docs/huehue.png" 
              alt="HueHue"
              className="w-10 h-10"
            />
            <div>
              <h3 className="font-arcade text-sm text-primary">RetroGames HueHue</h3>
              <p className="text-xs text-muted-foreground">Junior Games</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a 
              href="https://rahuehue-online.pages.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Emulador
            </a>
            <a 
              href="https://rahuehue-online.pages.dev/lists/RAHueHue%20Online" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Lista de Jogos
            </a>
            <a 
              href="https://play.webrcade.com/?feed=https://tinyurl.com/retrohue" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              WebRcade
            </a>
          </div>

          {/* Credits */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive animate-pulse" />
            <span>para a comunidade</span>
            <Gamepad2 className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} RetroGames HueHue. Todos os jogos são propriedade de seus respectivos donos.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Powered by <span className="text-primary">EmulatorJS</span> • Inspirado por <span className="text-primary">WebRcade</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
