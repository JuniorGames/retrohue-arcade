import { Gamepad2, Globe, Smartphone, Monitor } from 'lucide-react';

const links = [
  {
    title: 'Emulador Principal',
    description: 'Acesse o emulador completo com todos os consoles',
    url: 'https://rahuehue-online.pages.dev',
    icon: Gamepad2,
    color: 'from-neon-green to-neon-cyan'
  },
  {
    title: 'Lista de Jogos',
    description: 'Navegue pela biblioteca completa de jogos',
    url: 'https://rahuehue-online.pages.dev/lists/RAHueHue%20Online',
    icon: Globe,
    color: 'from-neon-cyan to-neon-pink'
  },
  {
    title: 'WebRcade',
    description: 'Experiência arcade no navegador',
    url: 'https://play.webrcade.com/?feed=https://tinyurl.com/retrohue',
    icon: Monitor,
    color: 'from-neon-pink to-neon-orange'
  },
  {
    title: 'Android App',
    description: 'Jogue no seu dispositivo móvel',
    url: 'https://rahuehue-online.pages.dev',
    icon: Smartphone,
    color: 'from-neon-orange to-neon-yellow'
  }
];

const QuickLinks = () => {
  return (
    <section className="py-12">
      <h2 className="font-arcade text-xl md:text-2xl text-center text-foreground mb-8">
        <span className="text-primary">Acesso</span> Rápido
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {links.map((link, index) => (
          <a
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group card-retro rounded-xl p-6 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Icon with gradient */}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} 
                          flex items-center justify-center mb-4 
                          group-hover:scale-110 transition-transform duration-300`}>
              <link.icon className="w-6 h-6 text-background" />
            </div>

            {/* Title */}
            <h3 className="font-arcade text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
              {link.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground">
              {link.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default QuickLinks;
