import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Timer } from 'lucide-react';

const PomodoroLock: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 mins
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setShowQuitConfirm(false);
  };

  const handleQuitAttempt = () => {
    setShowQuitConfirm(true);
  };

  const confirmQuit = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
    setShowQuitConfirm(false);
  };

  return (
    <div className="bg-white border border-stone-200 p-6 rounded-3xl shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-50 rounded-full text-purple-500">
          <Lock size={20} />
        </div>
        <h3 className="text-stone-800 font-medium">디지털 족쇄 (집중 모드)</h3>
      </div>

      <div className="flex flex-col items-center justify-center py-6">
        <div className="text-5xl font-bold text-stone-800 font-mono tracking-wider mb-2">
          {formatTime(timeLeft)}
        </div>
        <p className="text-stone-500 text-xs mb-6">
          {isActive ? "다른 앱은 잠시 잊고, 지금 이 순간에만 집중해요." : "딱 25분만 몰입해볼까요?"}
        </p>

        {!isActive ? (
          <button
            onClick={handleStart}
            className="w-full py-3 bg-purple-50 hover:bg-purple-100 text-purple-600 border border-purple-100 rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            <Timer size={18} /> 집중 시작하기
          </button>
        ) : showQuitConfirm ? (
          <div className="w-full bg-stone-50 p-4 rounded-xl text-center border border-rose-200 animate-pulse">
            <p className="text-rose-500 text-sm mb-3">잠깐만요! 지금 그만두면 너무 아쉽지 않을까요?</p>
            <div className="flex gap-2">
              <button onClick={() => setShowQuitConfirm(false)} className="flex-1 py-2 bg-stone-200 rounded-lg text-sm text-stone-700">계속 할래요</button>
              <button onClick={confirmQuit} className="flex-1 py-2 bg-rose-50 text-rose-500 rounded-lg text-sm">그만할래요</button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleQuitAttempt}
            className="w-full py-3 bg-stone-100 text-stone-500 hover:text-stone-700 rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            <Unlock size={18} /> 잠금 해제
          </button>
        )}
      </div>
    </div>
  );
};

export default PomodoroLock;