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
      target="_blank"
      rel="noopener noreferrer"
      className="group card-retro rounded-xl p-4 md:p-6 flex flex-col items-center text-center cursor-pointer animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Console Icon */}
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img
          src={consoleData.icon}
          alt={consoleData.name}
          className="console-icon w-16 h-16 md:w-20 md:h-20 object-contain relative z-10"
          loading="lazy"
        />
      </div>

      {/* Console Name */}
      <h3 className="font-arcade text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
        {consoleData.name}
      </h3>

      {/* Category Badge */}
      <span className="text-xs text-muted-foreground capitalize px-2 py-1 rounded-full bg-muted/50">
        {consoleData.category === 'handheld' ? 'Portátil' : consoleData.category}
      </span>

      {/* Hover indicator */}
      <div className="mt-4 flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs font-medium">Ver jogos</span>
        <ExternalLink className="w-3 h-3" />
      </div>
    </a>
  );
};

export default ConsoleCard;
