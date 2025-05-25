import React, { useState, useEffect, useRef } from 'react';

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const banners: Banner[] = [
  {
    id: 1,
    title: "Inteligência,",
    subtitle: "automação e",
    description: "eficiência",
    image: "/lovable-uploads/22e842e0-298d-4403-aff8-f09f017dacc9.png"
  },
  {
    id: 2,
    title: "Integração, dados e",
    subtitle: "agilidade",
    description: "Fazemos seus sistemas e processos trabalharem juntos",
    image: "/lovable-uploads/9c0e5828-1d60-4742-b05b-406daa5f27d2.png"
  },
  {
    id: 3,
    title: "Consultoria",
    subtitle: "estratégica e novos",
    description: "produtos",
    image: "/lovable-uploads/388dd444-936a-4239-9933-ffb4e92c8f4e.png"
  }
];

const VerticalCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearAllTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    const startCycle = () => {
      console.log('Iniciando novo ciclo');
      clearAllTimers();
      
      // Reset inicial
      setProgress(0);
      setCurrentIndex(0);
      setIsWaiting(false);
      
      // Progresso da barra (10 segundos total)
      let progressValue = 0;
      intervalRef.current = setInterval(() => {
        progressValue += 1; // 1% por 100ms = 10 segundos total
        setProgress(progressValue);
        
        console.log(`Progresso: ${progressValue}%`);
        
        if (progressValue >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, 100);

      // Mudança para o segundo banner aos 5 segundos (50% do progresso)
      const timeout1 = setTimeout(() => {
        console.log('Mudando para banner 2');
        setCurrentIndex(1);
      }, 5000);
      timeoutsRef.current.push(timeout1);

      // Mudança para o terceiro banner aos 10 segundos (100% do progresso)
      const timeout2 = setTimeout(() => {
        console.log('Mudando para banner 3 - iniciando espera');
        setCurrentIndex(2);
        setIsWaiting(true);
      }, 10000);
      timeoutsRef.current.push(timeout2);

      // Reset completo após 15 segundos (10s progresso + 5s espera)
      const timeout3 = setTimeout(() => {
        console.log('Resetando ciclo completo');
        startCycle(); // Reinicia o ciclo
      }, 15000);
      timeoutsRef.current.push(timeout3);
    };

    startCycle();

    return () => {
      clearAllTimers();
    };
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-50" style={{ minHeight: '150vh' }}>
      <div className="w-full max-w-none mx-auto px-2">
        {/* Container principal em 3 colunas - melhor uso do espaço horizontal */}
        <div className="grid grid-cols-12 gap-2 items-center px-2" style={{ minHeight: '150vh' }}>
          
          {/* Coluna 1: Timer e sistema de transição - margem ainda menor */}
          <div className="col-span-1 flex justify-start pl-2">
            <div className="relative">
              {/* Barra vertical laranja - altura aumentada */}
              <div className="relative w-1 bg-gray-200 rounded-full overflow-hidden" style={{ height: '360px' }}>
                <div 
                  className="absolute top-0 left-0 w-full bg-capiva-orange rounded-full transition-all duration-100 ease-linear"
                  style={{
                    height: `${progress}%`,
                  }}
                />
              </div>
              
              {/* Quadrados posicionados sobre a barra - sempre laranja */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col justify-between" style={{ height: '360px' }}>
                {banners.map((banner, index) => (
                  <div
                    key={banner.id}
                    className="w-3 h-3 rounded-sm border-2 border-capiva-orange bg-capiva-orange"
                    style={{
                      marginTop: index === 0 ? '-6px' : undefined,
                      marginBottom: index === banners.length - 1 ? '-6px' : undefined
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Coluna 2: Conteúdo de texto e botão - mais espaço */}
          <div className="col-span-6 space-y-8 pl-2 pr-4">
            <div className="space-y-6">
              <div className="text-sm text-capiva-orange font-semibold uppercase tracking-wider">
                {currentIndex === 0 && "AUTOMAÇÃO QUE TRANSFORMA"}
                {currentIndex === 1 && "TUDO NO SEU LUGAR"}
                {currentIndex === 2 && "INOVAÇÃO SEM LIMITES"}
              </div>
              
              <div className="space-y-2">
                <h1 className="text-6xl font-bold text-gray-900 leading-tight">
                  {banners[currentIndex].title}
                </h1>
                <h2 className="text-6xl font-bold text-gray-900 leading-tight">
                  {banners[currentIndex].subtitle}
                </h2>
                {banners[currentIndex].id === 1 && (
                  <h3 className="text-6xl font-bold text-gray-900 leading-tight">
                    {banners[currentIndex].description}
                  </h3>
                )}
              </div>
              
              {banners[currentIndex].id !== 1 && (
                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                  {banners[currentIndex].description}
                </p>
              )}
              
              <button className="bg-capiva-orange hover:bg-capiva-orange-dark text-white px-10 py-4 rounded-lg font-semibold transition-colors duration-200 text-lg">
                QUERO TRANSFORMAR
              </button>
            </div>
          </div>

          {/* Coluna 3: Imagem ilustrativa - mais espaço */}
          <div className="col-span-5 flex justify-center items-center">
            <div className="w-full h-[500px] relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={banners[currentIndex].image}
                alt={`Ilustração ${banners[currentIndex].title}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay para melhor legibilidade se necessário */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VerticalCarousel;
