import { Youtube } from 'lucide-react';
import retrogamesLogo from '@/assets/retrogames-huehue-logo.png';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <img 
              src={retrogamesLogo}
              alt="RetroGames HueHue"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h3 className="font-arcade text-sm text-primary">RetroGames HueHue</h3>
              <p className="text-xs text-muted-foreground">Editado por Helton Junior.</p>
            </div>
          </div>

          {/* Visitor Counter */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 text-primary">
              <Eye className="w-4 h-4" />
              <span className="font-arcade text-sm">{visitCount.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Visitantes</p>
          </div>

          {/* YouTube Channel */}
          <a 
            href="https://www.youtube.com/@juniorgameslives"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            <Youtube className="w-5 h-5 text-destructive" />
            <span>Canal Junior Games</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} RetroGames HueHue. Jogue onde estiver no seu dispositivo pelo Navegador de Internet.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
