import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Play, Pause, RotateCcw } from 'lucide-react';
import { LineChart } from './components/LineChart';
import { Quiz } from './components/Quiz';
import { Simulation } from './components/Simulation';

function App() {
  const [speed, setSpeed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [timeData, setTimeData] = useState<number[]>([]);
  const [distanceData, setDistanceData] = useState<number[]>([]);
  const [speedData, setSpeedData] = useState<number[]>([]);

  const animationRef = useRef<number>();

  const handleSpeedChange = (newSpeed: number) => {
    if (newSpeed >= -10 && newSpeed <= 10) {
      setSpeed(newSpeed);
    }
  };

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setTime(0);
    setDistance(0);
    setTimeData([]);
    setDistanceData([]);
    setSpeedData([]);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isRunning) {
        const newTime = time + deltaTime;
        const newDistance = distance + speed * deltaTime;

        setTime(newTime);
        setDistance(newDistance);
        
        if (Math.floor(newTime * 10) > Math.floor(time * 10)) {
          setTimeData(prev => [...prev.slice(-49), newTime]);
          setDistanceData(prev => [...prev.slice(-49), newDistance]);
          setSpeedData(prev => [...prev.slice(-49), speed]);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, speed, time, distance]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Fizik Hareket Simülasyonu
          </h1>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleSpeedChange(speed - 1)}
                className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <ChevronDown className="w-6 h-6 text-blue-600" />
              </button>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{speed.toFixed(1)}</div>
                <div className="text-sm text-gray-500">m/s</div>
              </div>
              <button
                onClick={() => handleSpeedChange(speed + 1)}
                className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <ChevronUp className="w-6 h-6 text-blue-600" />
              </button>
            </div>

            <button
              onClick={toggleSimulation}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRunning ? 'Durdur' : 'Başlat'}
            </button>

            <button
              onClick={resetSimulation}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Sıfırla
            </button>
          </div>

          {/* Simulation */}
          <Simulation distance={distance} speed={speed} time={time} />

          {/* Graphs */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Yol - Zaman Grafiği</h3>
              <LineChart
                data={distanceData}
                labels={timeData}
                label="Yol (m)"
                borderColor="rgb(53, 162, 235)"
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Hız - Zaman Grafiği</h3>
              <LineChart
                data={speedData}
                labels={timeData}
                label="Hız (m/s)"
                borderColor="rgb(255, 99, 132)"
              />
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <Quiz />
      </div>
    </div>
  );
}

export default App;