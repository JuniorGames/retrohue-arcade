// Console and game data from RAHueHue Online

export interface Console {
  id: string;
  name: string;
  icon: string;
  listUrl: string;
  category: 'arcade' | 'nintendo' | 'sega' | 'atari' | 'sony' | 'handheld';
}

export interface Game {
  id: string;
  name: string;
  console: string;
  consoleId: string;
  thumbnail: string;
  romUrl?: string;
}

export const consoles: Console[] = [
  // Arcade
  {
    id: 'capcom',
    name: 'Arcade - Capcom',
    icon: 'https://rahuehue-online.pages.dev/lists/icons/Capcom.png',
    listUrl: 'https://rahuehue-online.pages.dev/lists/Capcom.html',
    category: 'arcade'
  },
  {
    id: 'konami',
    name: 'Arcade - Konami',
    icon: 'https://rahuehue-online.pages.dev/lists/icons/Konami.png',
    listUrl: 'https://rahuehue-online.pages.dev/lists/Konami.html',
    category: 'arcade'
  },
  {
    id: 'snk-neogeo',
    name: 'Arcade - SNK NeoGeo',
    icon: 'https://rahuehue-online.pages.dev/lists/icons/SNK%20-%20NeoGeo.png',
    listUrl: 'https://rahuehue-online.pages.dev/lists/SNK%20-%20NeoGeo.html',
    category: 'arcade'
  },
  // Atari
  {
    id: 'atari-2600',
    name: 'Atari 2600',
    icon: 'https://rahuehue-online.pages.dev/lists/icons/Atari%202600.png',
    listUrl: 'https://rahuehue-online.pages.dev/lists/Atari%202600.html',
    category: 'atari'
  },
  // Nintendo Handhelds
  {
    id: 'gameboy',
    name: 'GameBoy',
    icon: 'https://rahuehue-online.pages.dev/lists/icons/GameBoy.png',
    listUrl: 'https://rahuehue-online.pages.dev/lists/GameBoy.html',
    category: 'handheld'
  },
  {
    id: 'gameboy-color',
    name: 'GameBoy Color',
    icon: 'https://rahuehue-online.pages.dev/lists/icons/GameBoy%20Color.png',
    listUrl: 'https://rahuehue-online.pages.dev/lists/GameBoy%20Color.html',
    category: 'handheld'
  },
  {
    id: 'gameboy-advance',
    name: 'GameBoy Advance',
    icon: 'https://rahuehue-online.pages.dev/lists/icons/GameBoy%20Advance.png',
    listUrl: 'https://rahuehue-online.pages.dev/lists/GameBoy%20Advance.html',
    category: 'handheld'
  },
  // Sega
  {
    id: 'mega-drive',
    name: 'Mega Drive',
    icon: 'https://rahuehue-online.pages.dev/lists/icons/Mega%20Drive.png',
    listUrl: 'https://rahuehue-online.pages.dev/lists/Mega%20Drive.html',
    category: 'sega'
  },
  {
    id: 'master-system',
    name: 'Master System',
    icon: 'https://rahuehue-online.pages.dev/lists/icons/Master%20System.png',
    listUrl: 'https://rahuehue-online.pages.dev/lists/Master%20System.html',
    category: 'sega'
  },
  // Nintendo Consoles
  {
    id: 'nintendo',
    name: 'Nintendo (NES)',
    icon: 'https://rahuehue-online.pages.dev/lists/icons/Nintendo.png',
    listUrl: 'https://rahuehue-online.pages.dev/lists/Nintendo.html',
    category: 'nintendo'
  },
  {
    id: 'super-nintendo',
    name: 'Super Nintendo',
    icon: 'https://rahuehue-online.pages.dev/lists/icons/Super%20Nintendo.png',
    listUrl: 'https://rahuehue-online.pages.dev/lists/Super%20Nintendo.html',
    category: 'nintendo'
  },
  {
    id: 'nintendo-64',
    name: 'Nintendo 64',
    icon: 'https://rahuehue-online.pages.dev/lists/icons/Nintendo%2064.png',
    listUrl: 'https://rahuehue-online.pages.dev/lists/Nintendo%2064.html',
    category: 'nintendo'
  },
  // Sony
  {
    id: 'playstation',
    name: 'PlayStation',
    icon: 'https://rahuehue-online.pages.dev/lists/icons/Playstation.png',
    listUrl: 'https://rahuehue-online.pages.dev/lists/Playstation.html',
    category: 'sony'
  }
];

export const categories = [
  { id: 'all', name: 'Todos', icon: '🎮' },
  { id: 'arcade', name: 'Arcade', icon: '🕹️' },
  { id: 'nintendo', name: 'Nintendo', icon: '🍄' },
  { id: 'sega', name: 'Sega', icon: '💎' },
  { id: 'atari', name: 'Atari', icon: '👾' },
  { id: 'sony', name: 'Sony', icon: '🎯' },
  { id: 'handheld', name: 'Portáteis', icon: '📱' }
];

// Featured games for the hero section
export const featuredGames = [
  {
    id: 'street-fighter-2',
    name: 'Street Fighter II',
    console: 'Arcade - Capcom',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80'
  },
  {
    id: 'sonic',
    name: 'Sonic The Hedgehog',
    console: 'Mega Drive',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80'
  },
  {
    id: 'super-mario',
    name: 'Super Mario Bros.',
    console: 'Nintendo',
    thumbnail: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&q=80'
  },
  {
    id: 'pokemon',
    name: 'Pokémon',
    console: 'GameBoy Color',
    thumbnail: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&q=80'
  }
];
