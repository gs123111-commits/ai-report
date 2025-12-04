import React, { useState } from 'react';
import { Briefcase, ArrowRight, Loader2 } from 'lucide-react';
import { translateExperience } from '../services/geminiService';
import { ExperienceTranslation } from '../types';

const ExperienceTranslator: React.FC = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<ExperienceTranslation[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!input) return;
    setLoading(true);
    const data = await translateExperience(input);
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="bg-white border border-stone-200 p-6 rounded-3xl shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-full text-blue-500">
          <Briefcase size={20} />
        </div>
        <div>
          <h3 className="text-stone-800 font-medium">경험치 변환소</h3>
          <p className="text-xs text-stone-500">당신의 덕질, 게임, 휴식도 스펙이 됩니다</p>
        </div>
      </div>

      {!results.length ? (
        <div className="space-y-3">
          <textarea
            className="w-full h-24 bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm text-stone-700 focus:outline-none focus:border-blue-300 transition-colors placeholder-stone-400"
            placeholder="예: 3년간 롤 다이아 티어 유지, 아이돌 생일카페 주최, 1년 동안 아무것도 안 하고 쉼..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleTranslate}
            disabled={!input || loading}
            className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl border border-blue-100 transition-all flex items-center justify-center gap-2 text-sm font-medium"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <ArrowRight size={16} />}
            직무 역량으로 변환하기
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
            <p className="text-xs text-stone-500 mb-2">입력한 경험: "{input}"</p>
            <div className="space-y-3">
              {results.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-1 min-w-[4px] h-[4px] rounded-full bg-blue-500" />
                  <div>
                    <h4 className="text-blue-700 font-bold text-sm">{item.skill}</h4>
                    <p className="text-stone-600 text-xs leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => { setResults([]); setInput(''); }}
            className="w-full py-2 text-xs text-stone-400 hover:text-stone-600"
          >
            다른 경험도 변환해보기
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceTranslator;