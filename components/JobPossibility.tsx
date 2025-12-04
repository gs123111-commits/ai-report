import React, { useEffect, useState } from 'react';
import { Briefcase, TrendingUp } from 'lucide-react';
import { getJobBuffs } from '../services/geminiService';
import { JobBuff } from '../types';

const JobPossibility: React.FC = () => {
  const [buffs, setBuffs] = useState<JobBuff[]>([]);

  useEffect(() => {
    getJobBuffs().then(setBuffs);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-6 rounded-3xl shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-full text-blue-600">
          <TrendingUp size={20} />
        </div>
        <div>
          <h3 className="text-stone-800 font-medium">나의 가능성 버프</h3>
          <p className="text-xs text-stone-500">부족함 대신 잠재력을 확인하세요</p>
        </div>
      </div>

      <div className="space-y-4">
        {buffs.map((buff, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-700 font-bold text-sm">{buff.name}</span>
              <span className="text-xs bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full">Lv. {Math.floor(buff.score / 10)}</span>
            </div>
            <div className="w-full bg-stone-100 h-1.5 rounded-full mb-2 overflow-hidden">
               <div className="bg-blue-400 h-full rounded-full" style={{ width: `${buff.score}%` }} />
            </div>
            <p className="text-xs text-stone-500">{buff.description}</p>
          </div>
        ))}

        <div className="mt-6 pt-4 border-t border-stone-100">
          <h4 className="text-xs text-stone-400 mb-3 flex items-center gap-2">
            <Briefcase size={12} />
            추천 마이크로 일자리
          </h4>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
             {['데이터 라벨링', '단순 타이핑', '펫 시터', '리뷰 작성'].map(job => (
               <span key={job} className="flex-shrink-0 px-3 py-1.5 bg-stone-50 text-stone-600 text-xs rounded-lg border border-stone-200">
                 {job}
               </span>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPossibility;