// src/components/ui/Slider.tsx
'use client';

import { useEffect, useState } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatLabel?: (value: number) => string;
}

export const Slider = ({ min, max, step = 1, value, onChange, formatLabel }: SliderProps) => {
  const [localValue, setLocalValue] = useState(value);
  const range = max - min;

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const getLeftPosition = (val: number) => {
    return ((val - min) / range) * 100;
  };

  const handleMouseDown = (index: number) => {
    const handleMouseMove = (e: MouseEvent) => {
      const slider = document.getElementById('slider-track');
      if (!slider) return;

      const rect = slider.getBoundingClientRect();
      const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      const rawValue = min + percent * range;
      const snappedValue = Math.round(rawValue / step) * step;
      
      const newValue = [...localValue] as [number, number];
      newValue[index] = snappedValue;

      // Prevent thumbs from crossing
      if (index === 0 && snappedValue < max && snappedValue <= newValue[1]) {
        setLocalValue(newValue);
        onChange(newValue);
      } else if (index === 1 && snappedValue > min && snappedValue >= newValue[0]) {
        setLocalValue(newValue);
        onChange(newValue);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="relative py-4">
      <div className="relative h-2">
        <div
          id="slider-track"
          className="absolute w-full h-2 bg-gray-200 rounded-full"
        />
        <div
          className="absolute h-2 bg-violet-500 rounded-full"
          style={{
            left: `${getLeftPosition(localValue[0])}%`,
            right: `${100 - getLeftPosition(localValue[1])}%`
          }}
        />
        
        {/* Thumbs */}
        {[0, 1].map((index) => (
          <div
            key={index}
            className="absolute w-4 h-4 bg-white border-2 border-violet-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/4 hover:scale-110 transition-transform"
            style={{ left: `${getLeftPosition(localValue[index])}%` }}
            onMouseDown={() => handleMouseDown(index)}
          />
        ))}
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>{formatLabel ? formatLabel(localValue[0]) : localValue[0]}</span>
        <span>{formatLabel ? formatLabel(localValue[1]) : localValue[1]}</span>
      </div>
    </div>
  );
};