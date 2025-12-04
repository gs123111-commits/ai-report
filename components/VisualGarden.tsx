
import React, { useState } from 'react';
import { Gift, TreeDeciduous, Sparkles, X, Coffee, Coins, Star } from 'lucide-react';

interface VisualGardenProps {
  level: number;
}

interface Reward {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const REWARDS: Reward[] = [
  { id: 'r1', name: '신비한 씨앗 50개', icon: <TreeDeciduous size={32} />, description: '정원을 더 풍성하게 만들 수 있어요.', color: 'text-emerald-500 bg-emerald-100' },
  { id: 'r2', name: '경험치 +100 XP', icon: <Star size={32} />, description: '성장이 더 빨라집니다!', color: 'text-yellow-500 bg-yellow-100' },
  { id: 'r3', name: '커피 기프티콘 응모권', icon: <Coffee size={32} />, description: '당첨 확률이 올라갔어요!', color: 'text-amber-700 bg-amber-100' },
  { id: 'r4', name: '보너스 코인 500G', icon: <Coins size={32} />, description: '상점에서 아이템을 구매하세요.', color: 'text-blue-500 bg-blue-100' },
];

const VisualGarden: React.FC<VisualGardenProps> = ({ level }) => {
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isBoxOpening, setIsBoxOpening] = useState(false);

  const handleOpenBox = () => {
    if (isBoxOpening) return;
    setIsBoxOpening(true);
    
    // Simulate opening delay
    setTimeout(() => {
      const random = REWARDS[Math.floor(Math.random() * REWARDS.length)];
      setSelectedReward(random);
      setShowRewardModal(true);
      setIsBoxOpening(false);
    }, 1500);
  };

  const closeReward = () => {
    setShowRewardModal(false);
    setSelectedReward(null);
  };

  return (
    <div className="space-y-6">
      {/* Garden Visual Area */}
      <div className="bg-gradient-to-b from-sky-50 to-emerald-50 border border-emerald-100 p-8 rounded-3xl flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden shadow-sm transition-all duration-700">
        {/* Background Elements */}
        <div className="absolute bottom-0 w-full h-12 bg-emerald-100/50 blur-xl" />
        <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-200/20 rounded-full blur-2xl animate-pulse" />
        
        {/* Tree Evolution based on Level */}
        <div className="relative z-10 animate-float transition-all duration-500">
          {level < 2 ? (
            // Level 1: Small Sprout
            <div className="flex flex-col items-center group">
               <div className="relative">
                 <div className="w-4 h-8 bg-emerald-400 rounded-t-full origin-bottom group-hover:skew-x-3 transition-transform" />
                 <div className="absolute -left-3 top-2 w-3 h-3 bg-emerald-300 rounded-full rounded-tr-none" />
               </div>
               <div className="w-2 h-4 bg-amber-700" />
               <div className="w-12 h-2 bg-black/10 rounded-full blur-sm mt-1" />
               <p className="mt-6 text-emerald-700 text-sm font-medium bg-white/60 px-3 py-1 rounded-full backdrop-blur-sm">Lv.{level} 작은 새싹</p>
            </div>
          ) : level < 10 ? (
            // Level 2~9: Growing Sapling
            <div className="flex flex-col items-center animate-fade-in">
               <div className="relative">
                 <div className="w-16 h-16 bg-emerald-400 rounded-full opacity-90 shadow-lg shadow-emerald-200 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-tr from-emerald-500 to-emerald-300" />
                 </div>
                 <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-200 rounded-full animate-ping" />
               </div>
               <div className="w-3 h-12 bg-amber-700 -mt-2" />
               <div className="w-16 h-3 bg-black/10 rounded-full blur-sm mt-1" />
               <p className="mt-6 text-emerald-700 text-sm font-medium bg-white/60 px-3 py-1 rounded-full backdrop-blur-sm">Lv.{level} 자라나는 묘목</p>
            </div>
          ) : (
            // Level 10+: Big Tree
            <div className="flex flex-col items-center">
               <TreeDeciduous size={140} className="text-emerald-600 drop-shadow-xl" />
               <div className="w-24 h-4 bg-black/10 rounded-full blur-md mt-2" />
               <p className="mt-6 text-emerald-800 text-sm font-bold bg-white/60 px-4 py-1.5 rounded-full backdrop-blur-sm">Lv.{level} 단단한 나무</p>
            </div>
          )}
        </div>
      </div>

      {/* Random Box Button */}
      <button 
        onClick={handleOpenBox}
        disabled={isBoxOpening}
        className="w-full bg-white border border-amber-200 p-4 rounded-2xl flex items-center justify-between group hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm hover:shadow-md relative overflow-hidden"
      >
        {isBoxOpening && (
          <div className="absolute inset-0 bg-amber-50/80 z-10 flex items-center justify-center">
             <div className="animate-spin text-amber-500">
               <Sparkles size={24} />
             </div>
          </div>
        )}
        <div className="flex items-center gap-4">
           <div className={`p-3 bg-amber-50 rounded-full text-amber-500 transition-transform ${isBoxOpening ? 'animate-bounce' : 'group-hover:rotate-12'}`}>
             <Gift size={24} />
           </div>
           <div className="text-left">
             <h3 className="text-stone-700 font-bold">랜덤 보상 박스</h3>
             <p className="text-stone-500 text-xs">오늘 하루도 수고한 나에게 선물</p>
           </div>
        </div>
        <span className="text-xs bg-amber-100 text-amber-600 px-3 py-1 rounded-full font-medium">Open</span>
      </button>

      {/* Reward Modal */}
      {showRewardModal && selectedReward && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm px-6 animate-fade-in">
          <div className="bg-white w-full max-w-sm p-8 rounded-3xl shadow-2xl relative flex flex-col items-center text-center animate-float">
            
            {/* Confetti Effect (Simple CSS) */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
               <div className="absolute top-0 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-ping" />
               <div className="absolute top-10 right-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-bounce" />
               <div className="absolute top-5 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            </div>

            <button 
              onClick={closeReward}
              className="absolute top-4 right-4 text-stone-300 hover:text-stone-500 transition-colors"
            >
              <X size={24} />
            </button>

            <div className={`w-24 h-24 rounded-full ${selectedReward.color} flex items-center justify-center mb-6 shadow-inner`}>
               {selectedReward.icon}
            </div>

            <h2 className="text-2xl font-bold text-stone-800 mb-2">축하합니다!</h2>
            <h3 className="text-lg font-medium text-emerald-600 mb-4">{selectedReward.name}</h3>
            <p className="text-stone-500 text-sm mb-8 leading-relaxed">
              {selectedReward.description}
            </p>

            <button 
              onClick={closeReward}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all"
            >
              보상 받기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualGarden;
