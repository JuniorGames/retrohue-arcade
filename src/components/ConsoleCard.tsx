import { ExternalLink } from 'lucide-react';
import type { Console } from '@/data/consoles';

interface ConsoleCardProps {
  console: Console;
  index: number;
}

const ConsoleCard = ({ console: consoleData, index }: ConsoleCardProps) => {
  return (
    <a
      href={consoleData.listUrl}
      className="group card-retro rounded-xl p-4 flex flex-col items-center text-center cursor-pointer animate-fade-in w-full h-full"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative mb-3">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img
          src={consoleData.icon}
          alt={consoleData.name}
          className="console-icon w-14 h-14 md:w-16 md:h-16 object-contain relative z-10"
          loading="lazy"
        />
      </div>

      <h3 className="font-arcade text-xs md:text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
        {consoleData.name}
      </h3>

      <span className="text-[10px] text-muted-foreground capitalize px-2 py-0.5 rounded-full bg-muted/50">
        {consoleData.category === 'handheld' ? 'Portátil' : consoleData.category}
      </span>

      <div className="mt-3 flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs font-medium">Ver jogos</span>
        <ExternalLink className="w-3 h-3" />
      </div>
    </a>
  );
};

export default ConsoleCard;
