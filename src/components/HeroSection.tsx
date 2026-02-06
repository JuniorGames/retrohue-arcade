import { Gamepad2, Youtube } from 'lucide-react';
import headerLogo from '@/assets/retrogames-header-logo.png';
import pixQrCode from '@/assets/pix-qrcode.jpeg';

const HeroSection = () => {
  return (
<section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {/* Floating Icons - Hidden on mobile/tablet, visible on desktop only */}
      <div className="absolute left-4 md:left-10 top-1/4 hidden lg:block">
        <img 
          src="https://rahuehue-online.pages.dev/docs/huehue.png" 
          alt=""
          className="w-40 xl:w-56 animate-float"
          style={{ animationDelay: '0s' }}
        />
      </div>
      <div className="absolute right-4 md:right-10 top-1/4 hidden lg:block">
        <img 
          src="https://rahuehue-online.pages.dev/docs/jr.png" 
          alt=""
          className="w-40 xl:w-56 animate-float"
          style={{ animationDelay: '1.5s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <img 
              src={headerLogo}
              alt="RetroGames HueHue"
              className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto drop-shadow-2xl object-contain animate-logo-float"
            />
          </div>

          {/* Title */}
          <h1 
            className="font-arcade text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-glow animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-foreground">RETRO</span>
            <span className="text-foreground">&nbsp;GAMES</span>
          </h1>
          <h2 
            className="font-pixel text-xl md:text-3xl mb-8 animate-fade-in tracking-[0.3em]"
            style={{ animationDelay: '0.3s' }}
          >
            <span className="text-blue-600">H</span>
            <span className="text-neon-yellow">u</span>
            <span className="text-primary">e</span>
            <span className="text-blue-600">H</span>
            <span className="text-neon-yellow">u</span>
            <span className="text-primary">e</span>
          </h2>

          {/* PIX Donation Section */}
          <div 
            className="mb-8 animate-fade-in flex flex-col items-center"
            style={{ animationDelay: '0.35s' }}
          >
            <p className="text-muted-foreground text-sm md:text-base mb-3">
              Doe na chave pix se puder e quiser! Muito obrigado!
            </p>
            <img 
              src={pixQrCode}
              alt="QR Code PIX"
              className="w-32 h-32 md:w-40 md:h-40 rounded-lg border-2 border-primary/30"
            />
            <p className="text-primary font-mono text-xs md:text-sm mt-2">
              jrgameslives@gmail.com
            </p>
          </div>

          {/* Description */}
          <p 
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            Deguste o melhor dos jogos retrô! Arcade, Nintendo, Sega, PlayStation e muito mais. 
            Jogue diretamente no seu navegador sem instalar nada.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <a
              href="https://www.youtube.com/@juniorgameslives"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-arcade px-8 py-4 rounded-xl flex items-center gap-3 text-base"
            >
              <Youtube className="w-5 h-5" />
              Junior Games
            </a>
            <a
              href="https://rahuehue-online.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-arcade px-8 py-4 rounded-xl flex items-center gap-3 text-base"
            >
              <Gamepad2 className="w-5 h-5" />
              RAHueHue Online
            </a>
            <a
              href="https://play.webrcade.com/?feed=https://tinyurl.com/retrohue"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-arcade px-8 py-4 rounded-xl flex items-center gap-3 text-base"
            >
              <Gamepad2 className="w-5 h-5" />
              WebRcade HueHue
            </a>
          </div>

          {/* Stats */}
          <div 
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="text-center">
              <div className="font-arcade text-2xl md:text-3xl text-primary text-glow-sm">13+</div>
              <div className="text-sm text-muted-foreground mt-1">Plataformas</div>
            </div>
            <div className="text-center">
              <div className="font-arcade text-2xl md:text-3xl text-neon-cyan text-glow-sm">5000+</div>
              <div className="text-sm text-muted-foreground mt-1">Jogos</div>
            </div>
            <div className="text-center">
              <div className="font-arcade text-2xl md:text-3xl text-neon-pink text-glow-sm">100%</div>
              <div className="text-sm text-muted-foreground mt-1">Grátis</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
