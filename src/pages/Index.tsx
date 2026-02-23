import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import CategoryFilter from '@/components/CategoryFilter';
import ConsoleGrid from '@/components/ConsoleGrid';
import Footer from '@/components/Footer';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-background relative scanlines">

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="font-arcade text-2xl md:text-3xl text-foreground mb-2">
            <span className="text-primary">Escolha</span> seu Console
          </h2>
          <p className="text-muted-foreground">
            Navegue pelas plataformas e encontre seus jogos favoritos.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory} 
          />
        </div>

        {/* Console Grid */}
        <ConsoleGrid 
          searchQuery="" 
          selectedCategory={selectedCategory} 
        />
      </main>



      {/* Important Notice */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-start gap-2 justify-center text-center py-4 px-3 rounded-md border border-neon-yellow/30 bg-neon-yellow/5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-neon-yellow shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          <p className="text-xs text-neon-yellow">
            Os jogos e plataformas contidos nesta página podem ficar fora do ar sem aviso, trata-se de conteúdos públicos na internet, não contém servidor particular de armazenamento de roms e emuladores.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Index;
