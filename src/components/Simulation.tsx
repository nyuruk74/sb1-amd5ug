import React from 'react';

interface SimulationProps {
  distance: number;
  speed: number;
  time: number;
}

export function Simulation({ distance, speed, time }: SimulationProps) {
  // Calculate position within the visible road segment (0-100%)
  const position = (distance % 300) / 300 * 100;

  return (
    <div className="space-y-4">
      <div className="relative h-48 bg-gray-800 rounded-lg overflow-hidden">
        {/* Static Road */}
        <div className="absolute inset-0">
          {/* Road surface */}
          <div className="absolute inset-0 bg-gray-700" />
          
          {/* Center line */}
          <div className="absolute top-1/2 left-0 right-0 h-2">
            <div className="h-full">
              <div className="h-full w-full flex">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="h-full w-12 mx-2 bg-yellow-400" />
                ))}
              </div>
            </div>
          </div>
          
          {/* Side lines */}
          <div className="absolute top-1/4 left-0 right-0 h-[3px] bg-white" />
          <div className="absolute bottom-1/4 left-0 right-0 h-[3px] bg-white" />
        </div>

        {/* Car */}
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-transform duration-100"
          style={{ 
            transform: `translateX(${position}%)`,
            transition: 'transform 100ms linear'
          }}
        >
          <div className="relative w-24 h-12">
            {/* Car body */}
            <div className="absolute inset-0 bg-blue-600 rounded-lg shadow-lg">
              {/* Hood */}
              <div className="absolute top-0 left-0 right-8 h-full bg-blue-700 rounded-l-lg" />
              
              {/* Windows */}
              <div className="absolute top-1 left-8 right-2 h-4 bg-sky-200 rounded" />
              
              {/* Headlights */}
              <div className="absolute top-2 left-1 w-2 h-2 bg-yellow-200 rounded-full" />
              <div className="absolute bottom-2 right-1 w-2 h-2 bg-red-500 rounded-full" />
              
              {/* Wheels with rotation animation */}
              <div className="absolute -bottom-1 left-3 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-300">
                <div 
                  className="w-full h-0.5 bg-gray-300 absolute top-1/2 -translate-y-1/2"
                  style={{
                    animation: speed !== 0 ? `spin ${Math.abs(2/speed)}s linear infinite` : 'none',
                    transform: `rotate(${speed < 0 ? '-180deg' : '0deg'})`
                  }}
                />
              </div>
              <div className="absolute -bottom-1 right-3 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-300">
                <div 
                  className="w-full h-0.5 bg-gray-300 absolute top-1/2 -translate-y-1/2"
                  style={{
                    animation: speed !== 0 ? `spin ${Math.abs(2/speed)}s linear infinite` : 'none',
                    transform: `rotate(${speed < 0 ? '-180deg' : '0deg'})`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Speed indicator */}
        <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full shadow text-sm">
          {speed.toFixed(1)} m/s
        </div>
      </div>

      {/* Data display */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-blue-600 font-medium">Alınan Yol</div>
          <div className="text-xl font-bold text-blue-800">{distance.toFixed(1)} m</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-green-600 font-medium">Geçen Süre</div>
          <div className="text-xl font-bold text-green-800">{time.toFixed(1)} s</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm text-purple-600 font-medium">Anlık Hız</div>
          <div className="text-xl font-bold text-purple-800">{speed.toFixed(1)} m/s</div>
        </div>
      </div>
    </div>
  );
}