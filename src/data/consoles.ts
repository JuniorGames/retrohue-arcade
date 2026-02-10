// Console and game data from RAHueHue Online
import webrcadeIcon from '@/assets/webrcade-huehue-icon.png';
import emulatorjsIcon from '@/assets/emulatorjs-icon.png';

export interface Console {
  id: string;
  name: string;
  icon: string;
  listUrl: string;
  category: 'arcade' | 'nintendo' | 'sega' | 'atari' | 'sony' | 'handheld';
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
  },
  // WebRcade - Special entry (only shows in "all")
  {
    id: 'webrcade-huehue',
    name: 'WebRcade HueHue',
    icon: webrcadeIcon,
    listUrl: 'https://play.webrcade.com/?feed=https://tinyurl.com/retrohue',
    category: 'webrcade' as any
  },
  // EmulatorJS - Special entry (only shows in "all")
  {
    id: 'emulatorjs',
    name: 'EmulatorJS',
    icon: emulatorjsIcon,
    listUrl: 'https://demo.emulatorjs.org',
    category: 'emulatorjs' as any
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

