
import React, { useState, useEffect } from 'react';

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

const banners: Banner[] = [
  {
    id: 1,
    title: "Inteligência,",
    subtitle: "automação e",
    description: "eficiência",
    icon: "🚀"
  },
  {
    id: 2,
    title: "Integração, dados e",
    subtitle: "agilidade",
    description: "Fazemos seus sistemas e processos trabalharem juntos",
    icon: "⚡"
  },
  {
    id: 3,
    title: "Consultoria",
    subtitle: "estratégica e novos",
    description: "produtos",
    icon: "💡"
  }
];

const VerticalCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setProgress(0);
      
      // Start progress animation
      setTimeout(() => {
        setProgress(100);
      }, 50);
      
      // Change slide after 5 seconds
      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % banners.length;
          return nextIndex;
        });
        setIsAnimating(false);
      }, 5000);
      
    }, 5000);

    // Initial animation
    setIsAnimating(true);
    setTimeout(() => setProgress(100), 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="flex w-full max-w-6xl gap-8 items-center">
        {/* Left side content */}
        <div className="flex-1 space-y-8">
          {/* Progress indicators */}
          <div className="flex items-center gap-4">
            <div className="relative w-1 h-64 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute bottom-0 left-0 w-full bg-capiva-orange rounded-full transition-transform duration-[5000ms] ease-linear origin-bottom"
                style={{
                  transform: `scaleY(${progress / 100})`,
                  transformOrigin: 'bottom'
                }}
              />
            </div>
            
            {/* Banner indicators */}
            <div className="space-y-4">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xl transition-all duration-300 ${
                    index === currentIndex
                      ? 'border-capiva-orange bg-capiva-orange text-white'
                      : 'border-gray-300 bg-white text-gray-400'
                  }`}
                >
                  {banner.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-6">
            <div className="text-sm text-capiva-orange font-semibold uppercase tracking-wider">
              {currentIndex === 0 && "AUTOMAÇÃO QUE TRANSFORMA"}
              {currentIndex === 1 && "TUDO NO SEU LUGAR"}
              {currentIndex === 2 && "INOVAÇÃO SEM LIMITES"}
            </div>
            
            <div className="space-y-2">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                {banners[currentIndex].title}
              </h1>
              <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                {banners[currentIndex].subtitle}
              </h2>
              {banners[currentIndex].id === 1 && (
                <h3 className="text-5xl font-bold text-gray-900 leading-tight">
                  {banners[currentIndex].description}
                </h3>
              )}
            </div>
            
            {banners[currentIndex].id !== 1 && (
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                {banners[currentIndex].description}
              </p>
            )}
            
            <button className="bg-capiva-orange hover:bg-capiva-orange-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              QUERO TRANSFORMAR
            </button>
          </div>
        </div>

        {/* Right side mockup */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-96 h-96 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl shadow-2xl overflow-hidden">
            {/* Mockup content based on current slide */}
            {currentIndex === 0 && (
              <div className="p-6 space-y-4 text-white">
                <div className="bg-yellow-400 text-black p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="text-xs">Alexia Hyacinth</div>
                      <div className="text-xs opacity-75">Project Manager</div>
                    </div>
                  </div>
                  <div className="font-bold">OxeliaMetrix</div>
                  <div className="text-xs">Industry: SaaS</div>
                  <div className="mt-2">
                    <div className="text-xs mb-1">Project progress</div>
                    <div className="w-full bg-gray-300 rounded-full h-1">
                      <div className="bg-black h-1 rounded-full w-1/3"></div>
                    </div>
                    <div className="text-right text-xs mt-1">34%</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white text-black p-3 rounded-lg">
                    <div className="text-xs mb-1">Upcoming Meetings</div>
                    <div className="text-lg font-bold">3</div>
                    <div className="text-xs">calls • Thu, 11</div>
                  </div>
                  <div className="bg-gray-800 text-white p-3 rounded-lg">
                    <div className="text-xs mb-1">Efficiency</div>
                    <div className="text-lg font-bold">645 h</div>
                  </div>
                </div>
              </div>
            )}
            
            {currentIndex === 1 && (
              <div className="p-6 space-y-4 text-white">
                <div className="bg-white text-black p-4 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Income Tracker</div>
                  <div className="text-xs text-gray-600 mb-4">Track changes in income over time and access detailed data on each project and payments received</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">+20%</div>
                    <div className="text-xs text-gray-500">This week's income is higher than last week's</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white text-black p-3 rounded-lg">
                    <div className="text-xs mb-2">Let's Connect</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                        <div className="text-xs">Randy Gomez</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                        <div className="text-xs">Gina Schiefer</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white text-black p-3 rounded-lg">
                    <div className="text-xs mb-1">Your Recent Projects</div>
                    <div className="space-y-1">
                      <div className="text-xs font-semibold">Web Development Project</div>
                      <div className="text-xs font-semibold">Copyright Project</div>
                      <div className="text-xs font-semibold">Web Design Project</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {currentIndex === 2 && (
              <div className="p-6 space-y-4 text-white">
                <div className="bg-white text-black p-4 rounded-lg">
                  <div className="text-sm font-semibold mb-2">Meeting Scheduler</div>
                  <div className="text-xs mb-4">12 Jan</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-8 bg-purple-400 rounded"></div>
                      <div className="text-xs">Design meeting</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-8 bg-yellow-400 rounded"></div>
                      <div className="text-xs">One-on-One with John</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 text-white p-3 rounded-lg">
                    <div className="text-xs mb-1">Call Records</div>
                    <div className="text-xs">Design meeting</div>
                    <div className="text-lg font-bold">1 hour</div>
                  </div>
                  <div className="bg-white text-black p-3 rounded-lg">
                    <div className="text-xs mb-1">Upcoming Meetings</div>
                    <div className="space-y-1">
                      <div className="text-xs">One-on-One with John</div>
                      <div className="text-xs">HR Motivational Webinar</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalCarousel;
