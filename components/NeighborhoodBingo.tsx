import React, { useState, useEffect } from 'react';
import { MapPin, Check } from 'lucide-react';
import { BingoCell } from '../types';

interface NeighborhoodBingoProps {
  onComplete?: () => void;
  isCompleted?: boolean;
}

const NeighborhoodBingo: React.FC<NeighborhoodBingoProps> = ({ onComplete, isCompleted = false }) => {
  const [grid, setGrid] = useState<BingoCell[]>([
    { id: 1, label: '편의점 가기', isCompleted: true },
    { id: 2, label: '공원 벤치 앉기', isCompleted: false },
    { id: 3, label: '나무 사진 찍기', isCompleted: false },
    { id: 4, label: '도서관 입구', isCompleted: false },
    { id: 5, label: '카페 테이크아웃', isCompleted: false },
    { id: 6, label: '동네 한 바퀴', isCompleted: true },
    { id: 7, label: '문구점 구경', isCompleted: false },
    { id: 8, label: '하늘 보기', isCompleted: true },
    { id: 9, label: '인사 건네기', isCompleted: false },
  ]);

  const toggleCell = (id: number) => {
    if (isCompleted) return; // Disable editing if already fully completed/rewarded
    setGrid(prev => prev.map(cell => cell.id === id ? { ...cell, isCompleted: !cell.isCompleted } : cell));
  };

  useEffect(() => {
    if (!isCompleted && onComplete) {
      const allCompleted = grid.every(cell => cell.isCompleted);
      if (allCompleted) {
        // Add a small delay for visual effect
        setTimeout(() => {
            onComplete();
        }, 500);
      }
    }
  }, [grid, onComplete, isCompleted]);

  const completedCount = grid.filter(c => c.isCompleted).length;
  const progressPercentage = (completedCount / grid.length) * 100;

  return (
    <div className={`bg-white border border-stone-200 p-6 rounded-3xl shadow-sm transition-all duration-500 ${isCompleted ? 'ring-2 ring-emerald-400 ring-offset-2' : ''}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-full transition-colors ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-600'}`}>
          <MapPin size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-stone-800 font-medium">동네 탐험 빙고</h3>
          <p className="text-xs text-stone-500">
            {isCompleted ? "모든 탐험을 완료했어요! 멋져요!" : "집 밖으로 아주 조금만 나가볼까요?"}
          </p>
        </div>
        <div className={`text-xs font-bold px-2 py-1 rounded-lg ${isCompleted ? 'bg-emerald-500 text-white' : 'text-emerald-600 bg-emerald-50'}`}>
           {completedCount}/{grid.length}
        </div>
      </div>

      {/* Progress Gauge */}
      <div className="w-full bg-stone-100 h-3 rounded-full mb-6 overflow-hidden relative">
         <div 
           className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-1" 
           style={{ width: `${progressPercentage}%` }}
         >
           {progressPercentage >= 10 && <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />}
         </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {grid.map(cell => (
          <button
            key={cell.id}
            onClick={() => toggleCell(cell.id)}
            disabled={isCompleted}
            className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 text-center transition-all shadow-sm ${
              cell.isCompleted 
                ? 'bg-emerald-50 border-2 border-emerald-400 text-emerald-700' 
                : 'bg-stone-50 border border-stone-200 text-stone-400 hover:bg-white hover:border-emerald-200'
            }`}
          >
            {cell.isCompleted ? <Check size={24} className="mb-1 text-emerald-500" /> : <span className="text-xs opacity-30 mb-1">#{cell.id}</span>}
            <span className="text-[11px] leading-tight font-medium break-keep">{cell.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NeighborhoodBingo;