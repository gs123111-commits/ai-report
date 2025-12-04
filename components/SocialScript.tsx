import React, { useState } from 'react';
import { MessageCircle, Copy } from 'lucide-react';
import { generateSocialScript } from '../services/geminiService';
import { SocialScriptResponse } from '../types';

const SocialScript: React.FC = () => {
  const [situation, setSituation] = useState('');
  const [response, setResponse] = useState<SocialScriptResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!situation.trim()) return;
    setIsLoading(true);
    const result = await generateSocialScript(situation);
    setResponse(result);
    setIsLoading(false);
  };

  return (
    <div className="bg-white border border-stone-200 p-6 rounded-3xl shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-pink-50 rounded-full text-pink-500">
          <MessageCircle size={20} />
        </div>
        <div>
          <h3 className="text-stone-800 font-medium">상황별 대본</h3>
          <p className="text-xs text-stone-500">전화, 문의, 거절... 대신 써드릴게요</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="예: 배달 음식 잘못 왔다고 전화하기"
            className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm text-stone-800 focus:outline-none focus:border-pink-300 placeholder-stone-400"
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading || !situation.trim()}
            className="absolute right-2 top-2 p-1.5 bg-stone-200 rounded-lg text-stone-500 hover:bg-pink-500 hover:text-white transition-colors disabled:opacity-50"
          >
            <MessageCircle size={16} />
          </button>
        </div>

        {isLoading && <p className="text-xs text-center text-stone-400 animate-pulse">대본 작성 중...</p>}

        {response && (
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-100 animate-fade-in">
             <div className="mb-3">
               <span className="text-xs text-pink-500 font-bold block mb-1">💡 팁</span>
               <p className="text-xs text-stone-600">{response.tips}</p>
             </div>
             <div className="bg-white p-3 rounded-lg relative group border border-stone-100">
               <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-wrap">"{response.script}"</p>
               <button 
                onClick={() => navigator.clipboard.writeText(response.script)}
                className="absolute top-2 right-2 p-1 text-stone-300 hover:text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 <Copy size={14} />
               </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialScript;