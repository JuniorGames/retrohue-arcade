import { Gamepad2, Play, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {/* Floating Icons */}
      <div className="absolute left-4 md:left-10 top-1/4 opacity-20">
        <img 
          src="https://rahuehue-online.pages.dev/docs/huehue.png" 
          alt=""
          className="w-32 md:w-48 animate-float"
          style={{ animationDelay: '0s' }}
        />
      </div>
      <div className="absolute right-4 md:right-10 top-1/3 opacity-20">
        <img 
          src="https://rahuehue-online.pages.dev/docs/jr.png" 
          alt=""
          className="w-32 md:w-48 animate-float"
          style={{ animationDelay: '1.5s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Powered by EmulatorJS</span>
          </div>

          {/* Logo */}
          <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <img 
              src="https://rahuehue-online.pages.dev/icons/rahue.png" 
              alt="RetroGames HueHue"
              className="w-24 h-24 md:w-32 md:h-32 mx-auto drop-shadow-2xl"
            />
          </div>

          {/* Title */}
          <h1 
            className="font-arcade text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-glow animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-primary">RETRO</span>
            <span className="text-foreground">GAMES</span>
          </h1>
          <h2 
            className="font-pixel text-lg md:text-2xl text-neon-yellow mb-8 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            HUEHUE BR
          </h2>

          {/* Description */}
          <p 
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            Deguste o melhor dos jogos retrô! Arcade, Nintendo, Sega, PlayStation e muito mais. 
            Jogue diretamente no seu navegador sem downloads.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <a
              href="https://rahuehue-online.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-arcade px-8 py-4 rounded-xl flex items-center gap-3 text-base"
            >
              <Gamepad2 className="w-5 h-5" />
              Jogar Agora
            </a>
            <a
              href="https://play.webrcade.com/?feed=https://tinyurl.com/retrohue"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl border-2 border-primary/50 text-primary font-arcade font-semibold
                       hover:bg-primary/10 hover:border-primary transition-all duration-300 flex items-center gap-3"
            >
              <Play className="w-5 h-5" />
              WebRcade
            </a>
          </div>

          {/* Stats */}
          <div 
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="text-center">
              <div className="font-arcade text-2xl md:text-3xl text-primary text-glow-sm">13+</div>
              <div className="text-sm text-muted-foreground mt-1">Consoles</div>
            </div>
            <div className="text-center">
              <div className="font-arcade text-2xl md:text-3xl text-neon-cyan text-glow-sm">1000+</div>
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
