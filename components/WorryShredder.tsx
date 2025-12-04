import React, { useState } from 'react';
import { Trash2, Wind, Sparkles } from 'lucide-react';
import { generateComfortingResponse } from '../services/geminiService';
import { ShredderResponse } from '../types';

interface WorryShredderProps {
  onShredComplete?: () => void;
}

const WorryShredder: React.FC<WorryShredderProps> = ({ onShredComplete }) => {
  const [worry, setWorry] = useState('');
  const [isShredding, setIsShredding] = useState(false);
  const [result, setResult] = useState<ShredderResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleShred = async () => {
    if (!worry.trim()) return;
    
    setIsShredding(true);
    setIsLoading(true);

    // Wait for animation
    setTimeout(async () => {
      const response = await generateComfortingResponse(worry);
      setResult(response);
      setWorry('');
      setIsShredding(false);
      setIsLoading(false);
      
      // Award XP
      if (onShredComplete) {
        onShredComplete();
      }
    }, 1500);
  };

  const reset = () => {
    setResult(null);
  };

  if (result) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl text-center animate-fade-in shadow-sm">
        <div className="flex justify-center mb-4 text-emerald-500">
          <Sparkles size={32} className="animate-float" />
        </div>
        <h3 className="text-emerald-800 font-medium text-lg mb-2">마음이 조금 가벼워졌나요?</h3>
        <p className="text-stone-600 mb-4 font-light">"{result.comfortMessage}"</p>
        <div className="bg-white p-4 rounded-xl inline-block mb-4 border border-emerald-100">
          <span className="text-emerald-600 text-sm font-semibold">추천 작은 행동: </span>
          <span className="text-emerald-700 text-sm">{result.actionItem}</span>
        </div>
        <div className="text-xs text-stone-400 font-medium mb-4">+30 XP 획득!</div>
        <button 
          onClick={reset}
          className="w-full py-3 text-stone-400 text-sm hover:text-stone-600 transition-colors"
        >
          다른 걱정도 털어놓기
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-200 p-6 rounded-3xl relative shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-rose-50 rounded-full text-rose-500">
          <Trash2 size={20} />
        </div>
        <h3 className="text-stone-800 font-medium">걱정 파쇄기</h3>
      </div>
      
      <div className="relative">
        <textarea 
          className={`w-full h-32 bg-stone-50 border border-stone-200 rounded-xl p-4 text-stone-700 placeholder-stone-400 focus:outline-none focus:border-rose-300 transition-all resize-none ${isShredding ? 'shredding' : ''}`}
          placeholder="지금 나를 괴롭히는 생각들을 여기에 적고 날려버리세요. 아무도 볼 수 없어요."
          value={worry}
          onChange={(e) => setWorry(e.target.value)}
          disabled={isShredding || isLoading}
        />
        
        {isShredding && (
          <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-white to-transparent z-10" />
        )}
      </div>

      <button 
        onClick={handleShred}
        disabled={!worry.trim() || isShredding || isLoading}
        className={`w-full mt-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300
          ${!worry.trim() 
            ? 'bg-stone-100 text-stone-400 cursor-not-allowed' 
            : 'bg-rose-50 hover:bg-rose-100 text-rose-500 border border-rose-100'}`}
      >
        {isLoading ? (
          <span className="animate-pulse">갈아버리는 중...</span>
        ) : (
          <>
            <Wind size={18} />
            <span>걱정 파쇄하기 (+30 XP)</span>
          </>
        )}
      </button>
    </div>
  );
};

export default WorryShredder;