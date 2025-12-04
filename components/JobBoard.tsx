
import React, { useState } from 'react';
import { Briefcase, CheckCircle2, ChevronRight, GraduationCap, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { JobPosting, JobCoachingResponse } from '../types';
import { generateJobCoaching } from '../services/geminiService';

const MOCK_JOBS: JobPosting[] = [
  {
    id: 'j1',
    title: '데이터 라벨링 에디터',
    company: 'AI 퓨처스',
    tags: ['재택', '비대면', '초보가능'],
    difficulty: 'Easy',
    successfulSpecs: {
      category: '꼼꼼함 & 성실함',
      items: ['컴퓨터활용능력 2급', '블로그 운영 경험', '타자 500타 이상'],
      description: '합격한 선배들은 화려한 스펙보다는 "꾸준히 무언가를 기록해본 경험"을 높게 평가받았어요.'
    }
  },
  {
    id: 'j2',
    title: '커뮤니티 모니터링 요원',
    company: '세이프 넷',
    tags: ['유연근무', '텍스트기반'],
    difficulty: 'Easy',
    successfulSpecs: {
      category: '센스 & 문해력',
      items: ['SNS 헤비 유저', '온라인 게임 길드장 경험', 'CS 응대 아르바이트'],
      description: '합격 선배들은 온라인 밈과 문화에 익숙하고, 상황 판단이 빠른 분들이 많았어요.'
    }
  },
  {
    id: 'j3',
    title: '초급 콘텐츠 디자이너',
    company: '스타트업 콩',
    tags: ['포트폴리오', '창의성'],
    difficulty: 'Medium',
    successfulSpecs: {
      category: '도구 활용 & 감각',
      items: ['GTQ 1급', '인스타그램 부계정 운영', '미리캔버스 활용 가능'],
      description: '자격증보다는 실제로 내 취향을 담아 무언가를 만들어본 "작은 포트폴리오"가 핵심이었어요.'
    }
  }
];

const JobBoard: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [coaching, setCoaching] = useState<JobCoachingResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleJobSelect = async (job: JobPosting) => {
    setSelectedJob(job);
    setCoaching(null);
    setLoading(true);
    
    // Auto-generate coaching when job is selected
    const advice = await generateJobCoaching(job.title, job.successfulSpecs.items);
    setCoaching(advice);
    setLoading(false);
  };

  const handleBack = () => {
    setSelectedJob(null);
    setCoaching(null);
  };

  if (selectedJob) {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <button onClick={handleBack} className="text-stone-500 hover:text-stone-800 text-sm flex items-center mb-2">
          &larr; 목록으로 돌아가기
        </button>

        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-2 inline-block font-medium">{selectedJob.company}</span>
              <h2 className="text-2xl font-bold text-stone-800">{selectedJob.title}</h2>
            </div>
            <div className="bg-stone-100 p-2 rounded-full">
              <Briefcase className="text-stone-500" size={20} />
            </div>
          </div>
          <div className="flex gap-2">
            {selectedJob.tags.map(tag => (
              <span key={tag} className="text-xs text-stone-500 border border-stone-200 px-2 py-1 rounded-full bg-stone-50">#{tag}</span>
            ))}
          </div>
        </div>

        {/* Section 1: Successful Predecessors (The "Standard") */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <GraduationCap size={100} className="text-stone-900" />
          </div>
          <h3 className="text-stone-800 font-medium mb-1 flex items-center gap-2">
             <GraduationCap size={18} className="text-emerald-500" />
             합격 선배들의 가방 속 아이템
          </h3>
          <p className="text-xs text-stone-500 mb-6">먼저 길을 걸어간 분들은 이런 장비를 챙겼어요</p>

          <div className="space-y-4 relative z-10">
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
               <p className="text-sm text-stone-600 italic mb-3">"{selectedJob.successfulSpecs.description}"</p>
               <div className="flex flex-wrap gap-2">
                 {selectedJob.successfulSpecs.items.map((item, idx) => (
                   <span key={idx} className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100">
                     <CheckCircle2 size={12} />
                     {item}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* Section 2: AI Coaching (The "Bridge") */}
        <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-3xl border border-indigo-100 shadow-sm">
          <h3 className="text-indigo-800 font-medium mb-4 flex items-center gap-2">
            <Sparkles size={18} />
            {selectedJob.title} 공략 가이드
          </h3>

          {loading ? (
            <div className="flex flex-col items-center py-8 gap-3">
              <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-xs text-indigo-400">당신의 경험과 연결하는 중...</p>
            </div>
          ) : coaching ? (
            <div className="space-y-5 animate-fade-in">
              <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                <h4 className="text-sm font-bold text-indigo-600 mb-1">Coach's Note</h4>
                <p className="text-sm text-stone-600 leading-relaxed">{coaching.encouragement}</p>
              </div>

              <div>
                <h4 className="text-xs text-stone-400 mb-2 flex items-center gap-1">
                  <BookOpen size={12} /> 준비 전략
                </h4>
                <p className="text-sm text-stone-600 bg-white p-3 rounded-xl border border-stone-200">
                  {coaching.gapAnalysis}
                </p>
              </div>

              <div>
                <h4 className="text-xs text-stone-400 mb-2">오늘 시작하는 마이크로 로드맵</h4>
                <div className="space-y-2">
                  {coaching.roadmap.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-100 shadow-sm hover:border-indigo-200 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="text-xs text-indigo-500 font-bold mb-0.5">{step.step}</p>
                        <p className="text-sm text-stone-600">{step.action}</p>
                      </div>
                      <ChevronRight size={16} className="text-stone-300 ml-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-3xl border border-blue-100 mb-6 shadow-sm">
        <h2 className="text-xl font-bold text-stone-800 mb-1">가능성 탐험</h2>
        <p className="text-sm text-stone-500">지금의 나로서도 충분히 도전할 수 있는 곳들입니다.</p>
      </div>

      <div className="grid gap-4">
        {MOCK_JOBS.map((job) => (
          <button
            key={job.id}
            onClick={() => handleJobSelect(job)}
            className="w-full bg-white hover:bg-stone-50 p-5 rounded-2xl border border-stone-200 hover:border-blue-300 transition-all text-left group relative overflow-hidden shadow-sm hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs font-medium text-stone-400 block mb-1">{job.company}</span>
                <h3 className="text-lg font-bold text-stone-800 group-hover:text-blue-600 transition-colors">{job.title}</h3>
              </div>
              <div className={`
                w-2 h-2 rounded-full 
                ${job.difficulty === 'Easy' ? 'bg-emerald-400' : job.difficulty === 'Medium' ? 'bg-amber-400' : 'bg-rose-400'}
              `} />
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags.map(tag => (
                <span key={tag} className="text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-md group-hover:bg-white group-hover:border group-hover:border-stone-200 transition-all">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center text-xs text-blue-500 gap-1 font-medium">
              합격 선배 스펙 & 조언 보기 <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobBoard;