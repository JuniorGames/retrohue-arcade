import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import CategoryFilter from '@/components/CategoryFilter';
import ConsoleGrid from '@/components/ConsoleGrid';
import RomLinkPlayer from '@/components/RomLinkPlayer';
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
      {/* ROM Link Player */}
      <RomLinkPlayer />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Index;
