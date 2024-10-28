import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface LineChartProps {
  data: number[];
  labels: number[];
  label: string;
  borderColor: string;
}

export function LineChart({ data, labels, label, borderColor }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart>();

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels.map(t => t.toFixed(1)),
        datasets: [
          {
            label,
            data,
            borderColor,
            tension: 0.1,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        animation: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Zaman (s)',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: label,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, labels, label, borderColor]);

  return <canvas ref={canvasRef} />;
}