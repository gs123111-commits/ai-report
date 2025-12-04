import React, { useState } from 'react';
import { ArrowRight, Sprout } from 'lucide-react';
import { UserState, Mood } from '../types';

interface OnboardingProps {
  onComplete: (user: Partial<UserState>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [mood, setMood] = useState<Mood | null>(null);

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const finish = () => {
    onComplete({
      name,
      currentMood: mood || Mood.Neutral,
      isOnboarded: true,
      exp: 0,
      level: 1,
      streak: 0,
      sunlightCollected: false
    });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-fade-in">
            <div className="p-6 bg-emerald-100 rounded-full animate-float">
              <Sprout size={48} className="text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-stone-800 mb-3">반가워요</h1>
              <p className="text-stone-500 leading-relaxed max-w-xs mx-auto">
                여기는 평가도, 압박도 없는<br/>
                당신만의 작은 정원입니다.
              </p>
            </div>
            <button 
              onClick={handleNext}
              className="px-8 py-3 bg-stone-800 hover:bg-stone-700 text-stone-100 rounded-full transition-all flex items-center gap-2 shadow-lg"
            >
              시작하기 <ArrowRight size={16} />
            </button>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col h-full justify-center max-w-xs mx-auto animate-fade-in">
            <label className="text-stone-500 mb-4 text-center block">
              편하게 부를 수 있는<br/>이름을 알려주시겠어요?
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b-2 border-stone-300 text-center text-2xl py-2 text-stone-800 focus:border-emerald-500 focus:outline-none transition-colors mb-8 placeholder-stone-300"
              placeholder="별명도 좋아요"
              autoFocus
            />
            <button 
              onClick={handleNext}
              disabled={!name.trim()}
              className={`w-full py-3 rounded-xl font-medium transition-all ${
                name.trim() 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-100' 
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              다음
            </button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col h-full justify-center max-w-sm mx-auto animate-fade-in">
            <h2 className="text-xl text-stone-800 text-center mb-8">
              {name}님, 오늘 마음의 날씨는 어떤가요?<br/>
              <span className="text-sm text-stone-500 font-normal mt-2 block">솔직해도 괜찮아요. 아무도 모르니까요.</span>
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { m: Mood.Good, label: "맑음", icon: "☀️" },
                { m: Mood.Neutral, label: "보통", icon: "☁️" },
                { m: Mood.Low, label: "흐림", icon: "🌧️" },
                { m: Mood.Anxious, label: "불안", icon: "⛈️" },
              ].map((item) => (
                <button
                  key={item.m}
                  onClick={() => setMood(item.m)}
                  className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-2 shadow-sm ${
                    mood === item.m 
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-700' 
                      : 'bg-white border-stone-200 hover:border-emerald-200 text-stone-500'
                  }`}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
            <button 
              onClick={finish}
              disabled={!mood}
              className={`mt-8 w-full py-3 rounded-xl font-medium transition-all ${
                mood 
                  ? 'bg-stone-800 text-white hover:bg-stone-900 shadow-lg' 
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              정원으로 입장하기
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 flex flex-col">
      {renderStep()}
    </div>
  );
};

export default Onboarding;