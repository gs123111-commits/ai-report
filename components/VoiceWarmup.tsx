import React, { useState } from 'react';
import { Mic, Volume2 } from 'lucide-react';

const VoiceWarmup: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const texts = [
    "나는 오늘 나만의 속도로 걷고 있다.",
    "실수해도 괜찮아, 다시 하면 되니까.",
    "나의 목소리에는 힘이 있다."
  ];
  const [currentText] = useState(texts[Math.floor(Math.random() * texts.length)]);

  const handleRecord = () => {
    setIsRecording(true);
    setFeedback(null);
    // Simulate recording duration
    setTimeout(() => {
      setIsRecording(false);
      setFeedback("목소리 톤이 아주 차분하고 듣기 좋아요! 끝음을 조금 더 분명하게 맺어볼까요?");
    }, 2000);
  };

  return (
    <div className="bg-white border border-stone-200 p-6 rounded-3xl shadow-sm">
       <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-50 rounded-full text-orange-500">
          <Volume2 size={20} />
        </div>
        <div>
          <h3 className="text-stone-800 font-medium">입 트이기 연습</h3>
          <p className="text-xs text-stone-500">하루 1분, 잠긴 목소리를 깨워요</p>
        </div>
      </div>

      <div className="bg-stone-50 rounded-2xl p-6 text-center mb-4 border border-stone-100">
        <p className="text-lg text-stone-700 font-medium leading-relaxed">"{currentText}"</p>
      </div>

      {feedback ? (
        <div className="bg-emerald-50 p-4 rounded-xl mb-4 animate-fade-in border border-emerald-100">
           <p className="text-sm text-emerald-700">{feedback}</p>
        </div>
      ) : null}

      <button
        onClick={handleRecord}
        disabled={isRecording}
        className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
          isRecording 
          ? 'bg-rose-50 text-rose-500 animate-pulse' 
          : 'bg-stone-800 text-stone-100 hover:bg-stone-700'
        }`}
      >
        <Mic size={20} />
        {isRecording ? "녹음 중..." : "읽기 연습 시작"}
      </button>
    </div>
  );
};

export default VoiceWarmup;