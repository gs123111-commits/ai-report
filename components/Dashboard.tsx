
import React, { useState } from 'react';
import { UserState, Quest, Mood, Tab } from '../types';
import SunlightCheckIn from './SunlightCheckIn';
import WorryShredder from './WorryShredder';
import ExperienceTranslator from './ExperienceTranslator';
import PosturePolice from './PosturePolice';
import PomodoroLock from './PomodoroLock';
import SocialScript from './SocialScript';
import JobPossibility from './JobPossibility';
import NeighborhoodBingo from './NeighborhoodBingo';
import MuseumOfFailure from './MuseumOfFailure';
import MetaverseLibrary from './MetaverseLibrary';
import VisualGarden from './VisualGarden';
import VoiceWarmup from './VoiceWarmup';
import JobBoard from './JobBoard';
import CommunityBoard from './CommunityBoard';
import { Sprout, ShieldAlert, Check, Home, TrendingUp, Users, TreeDeciduous, Briefcase, PartyPopper, X, Send } from 'lucide-react';

interface DashboardProps {
  user: UserState;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [currentUser, setCurrentUser] = useState<UserState>({ ...user, bingoCompleted: false });
  const [activeSOS, setActiveSOS] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showLevelUp, setShowLevelUp] = useState(false);
  
  // Mentoring Modal State
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [mentorQuestion, setMentorQuestion] = useState('');
  const [mentorQuestionSent, setMentorQuestionSent] = useState(false);
  
  const [quests, setQuests] = useState<Quest[]>([
    { id: '1', title: '물 한 잔 마시기', description: '가장 쉬운 시작', xp: 10, isCompleted: false, category: 'health' },
    { id: '2', title: '창문 5cm 열기', description: '바깥 공기와 인사하기', xp: 15, isCompleted: false, category: 'health' },
    { id: '3', title: '기지개 펴기', description: '몸 깨우기', xp: 10, isCompleted: false, category: 'health' },
  ]);

  const handleQuestComplete = (id: string) => {
    setQuests(prev => prev.map(q => {
        if(q.id === id && !q.isCompleted) {
            setCurrentUser(u => ({ ...u, exp: u.exp + q.xp }));
            return { ...q, isCompleted: true };
        }
        return q;
    }));
  };

  const handleSunlightComplete = () => {
    if (!currentUser.sunlightCollected) {
      setCurrentUser(prev => ({
        ...prev,
        sunlightCollected: true,
        exp: prev.exp + 50
      }));
    }
  };

  const handleWorryComplete = () => {
    setCurrentUser(prev => ({
      ...prev,
      exp: prev.exp + 30
    }));
  };

  const handleBingoComplete = () => {
    if (currentUser.bingoCompleted) return;

    setCurrentUser(prev => ({
      ...prev,
      level: prev.level + 1,
      exp: prev.exp + 200, // Big XP bonus
      bingoCompleted: true
    }));
    setShowLevelUp(true);
    setTimeout(() => setShowLevelUp(false), 3000);
  };

  const handleSubmitQuestion = () => {
    if (!mentorQuestion.trim()) return;
    setMentorQuestionSent(true);
    // Close modal after success animation
    setTimeout(() => {
      setShowMentorModal(false);
      setMentorQuestionSent(false);
      setMentorQuestion('');
    }, 2000);
  };

  // SOS Mode Rendering
  if (activeSOS) {
    return (
      <div className="fixed inset-0 bg-stone-900 z-[100] flex flex-col items-center justify-center p-6 text-center space-y-12 animate-fade-in">
        <h1 className="text-3xl font-light text-emerald-100">숨을 깊게 들이마세요</h1>
        <div className="w-64 h-64 rounded-full bg-emerald-500/10 flex items-center justify-center animate-pulse">
          <div className="w-48 h-48 rounded-full bg-emerald-500/20 flex items-center justify-center">
             <span className="text-emerald-300 text-lg">4초 들이마시기...</span>
          </div>
        </div>
        <p className="text-stone-400 max-w-xs">지금 느끼는 감정은 파도처럼 지나갈 거예요. 당신은 안전합니다.</p>
        <button 
          onClick={() => setActiveSOS(false)}
          className="px-8 py-3 bg-stone-800 border border-stone-700 rounded-full text-stone-300 hover:text-white"
        >
          돌아가기
        </button>
      </div>
    );
  }

  // Calculate percentage within the current level (assuming 100 XP per visual level cycle)
  // This ensures that when user reaches 100, 200, etc., the bar resets visually
  const expPercentage = Math.min(currentUser.exp % 100, 100);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6 animate-fade-in">
            {/* Mood Greeting */}
            {currentUser.currentMood === Mood.Low && (
                <div className="p-4 bg-white rounded-2xl border-l-4 border-stone-400 text-stone-600 text-sm shadow-sm">
                    오늘은 무리하지 말고, 아주 작은 것 하나만 해볼까요?
                </div>
            )}
            <SunlightCheckIn isCompleted={currentUser.sunlightCollected} onComplete={handleSunlightComplete} />
            <WorryShredder onShredComplete={handleWorryComplete} />
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-stone-700 font-medium px-1">오늘의 마이크로 퀘스트</h3>
                <span className="text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-md">실패 없음 모드 ON</span>
              </div>
              <div className="space-y-3">
                {quests.map(quest => (
                  <button
                    key={quest.id}
                    onClick={() => handleQuestComplete(quest.id)}
                    disabled={quest.isCompleted}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group shadow-sm
                      ${quest.isCompleted 
                        ? 'bg-stone-100 border-stone-200 opacity-60' 
                        : 'bg-white border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/30'}`}
                  >
                    <div>
                      <h4 className={`font-medium ${quest.isCompleted ? 'text-stone-400 line-through' : 'text-stone-700'}`}>
                        {quest.title}
                      </h4>
                      <p className="text-xs text-stone-400 mt-0.5">{quest.description}</p>
                    </div>
                    {quest.isCompleted ? (
                       <Check size={18} className="text-emerald-500" />
                    ) : (
                       <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md">
                         +{quest.xp} XP
                       </span>
                    )}
                  </button>
                ))}
              </div>
            </section>
          </div>
        );
      case 'growth':
        return (
          <div className="space-y-6 animate-fade-in">
            <JobPossibility />
            <ExperienceTranslator />
            <PomodoroLock />
            <div className="grid grid-cols-1 gap-6">
              <VoiceWarmup />
              <SocialScript />
            </div>
          </div>
        );
      case 'jobs':
        return <JobBoard />;
      case 'connect':
        return (
          <div className="space-y-6 animate-fade-in">
            <CommunityBoard />
            <NeighborhoodBingo onComplete={handleBingoComplete} isCompleted={currentUser.bingoCompleted} />
            <MetaverseLibrary />
            <MuseumOfFailure />
            
            {/* Hidden Mentor Preview */}
            <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-3xl shadow-sm">
               <h3 className="text-indigo-800 font-medium mb-2">히든 선배 멘토링</h3>
               <p className="text-xs text-indigo-600/70 mb-4">"저도 2년 공백기가 있었어요. 질문 남겨주세요."</p>
               <button 
                onClick={() => setShowMentorModal(true)}
                className="w-full py-2 bg-indigo-100 text-indigo-600 rounded-xl text-xs hover:bg-indigo-200 transition-colors"
               >
                 질문하러 가기
               </button>
            </div>
          </div>
        );
      case 'garden':
        return (
          <div className="space-y-6 animate-fade-in">
             <VisualGarden level={currentUser.level} />
             
             {/* Stats */}
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl text-center shadow-sm border border-stone-100">
                   <h4 className="text-stone-400 text-xs">연속 접속</h4>
                   <p className="text-2xl font-bold text-stone-700 mt-1">3일</p>
                </div>
                <div className="bg-white p-4 rounded-2xl text-center shadow-sm border border-stone-100">
                   <h4 className="text-stone-400 text-xs">보유 씨앗</h4>
                   <p className="text-2xl font-bold text-emerald-500 mt-1">1,240</p>
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-32 relative text-stone-800 font-sans">
      <PosturePolice />
      
      {/* Level Up Overlay */}
      {showLevelUp && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white p-8 rounded-3xl text-center shadow-2xl transform animate-float">
             <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <PartyPopper size={40} />
             </div>
             <h2 className="text-2xl font-bold text-stone-800 mb-2">Level Up!</h2>
             <p className="text-stone-500 mb-4">대단해요! 당신의 세상이 조금 더 넓어졌어요.</p>
             <div className="text-3xl font-bold text-emerald-600">Lv. {currentUser.level}</div>
          </div>
        </div>
      )}

      {/* Mentor Question Modal */}
      {showMentorModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm px-6 animate-fade-in">
          <div className="bg-white w-full max-w-sm p-6 rounded-3xl shadow-xl relative transform transition-all">
            <button 
              onClick={() => setShowMentorModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <X size={20} />
            </button>
            
            {!mentorQuestionSent ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
                    <Users size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-indigo-900">히든 선배에게 물어보세요</h3>
                </div>
                <p className="text-sm text-stone-500 mb-4 pl-1">
                  공백기, 자존감, 취업 준비 등...<br/>
                  먼저 길을 걸어본 선배들이 익명으로 답변해드려요.
                </p>
                
                <textarea 
                  value={mentorQuestion}
                  onChange={(e) => setMentorQuestion(e.target.value)}
                  className="w-full h-32 bg-stone-50 border border-stone-200 rounded-xl p-4 text-sm resize-none focus:outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-200 mb-4 placeholder-stone-400 transition-all"
                  placeholder="예: 선배님, 2년 동안 쉬었는데 면접 때 뭐라고 설명하는 게 좋을까요?"
                  autoFocus
                />
                
                <button 
                  onClick={handleSubmitQuestion}
                  disabled={!mentorQuestion.trim()}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  질문 보내기
                </button>
              </>
            ) : (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                  <Check size={32} />
                </div>
                <h3 className="text-lg font-bold text-stone-800 mb-1">질문이 접수되었어요!</h3>
                <p className="text-sm text-stone-500">
                  선배들의 답변이 도착하면<br/>알림으로 알려드릴게요.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#FDFBF7]/90 backdrop-blur-md p-6 border-b border-stone-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-stone-800">
              {activeTab === 'home' && `안녕, ${currentUser.name}`}
              {activeTab === 'growth' && '성장 연구소'}
              {activeTab === 'jobs' && '가능성 탐험'}
              {activeTab === 'connect' && '느슨한 연대'}
              {activeTab === 'garden' && '나의 정원'}
            </h1>
            <p className="text-stone-500 text-sm">
              {activeTab === 'home' && '오늘도 조금씩 자라나고 있어요'}
              {activeTab === 'growth' && '당신의 경험은 버려지지 않아요'}
              {activeTab === 'jobs' && '선배들의 길을 따라가보세요'}
              {activeTab === 'connect' && '혼자가 아니에요'}
              {activeTab === 'garden' && '매일 조금씩 자라나는 나무'}
            </p>
          </div>
          <div className="flex flex-col items-end">
             <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
               <Sprout size={20} className="text-emerald-600" />
             </div>
             <span className="text-xs text-emerald-600 mt-1 font-medium">Lv.{currentUser.level}</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full transition-all duration-1000 ease-out" 
            style={{ width: `${expPercentage}%` }}
          />
        </div>
      </header>

      <main className="p-6 max-w-md mx-auto">
        {renderContent()}
      </main>

      {/* SOS Button */}
      <div className="fixed bottom-24 right-6 z-40">
        <button 
          onClick={() => setActiveSOS(true)}
          className="bg-rose-400 hover:bg-rose-500 text-white p-4 rounded-full shadow-lg shadow-rose-200 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center"
          aria-label="SOS Calm Down"
        >
          <ShieldAlert size={24} />
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/95 backdrop-blur-lg border-t border-stone-200 z-50 pb-safe shadow-[0_-5px_10px_rgba(0,0,0,0.02)]">
        <div className="flex justify-around items-center p-2 max-w-md mx-auto">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all ${activeTab === 'home' ? 'text-emerald-600 bg-emerald-50' : 'text-stone-400 hover:text-stone-600'}`}
          >
            <Home size={22} />
            <span className="text-[10px] mt-1 font-medium">홈</span>
          </button>
          <button 
            onClick={() => setActiveTab('growth')}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all ${activeTab === 'growth' ? 'text-blue-500 bg-blue-50' : 'text-stone-400 hover:text-stone-600'}`}
          >
            <TrendingUp size={22} />
            <span className="text-[10px] mt-1 font-medium">성장</span>
          </button>
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all ${activeTab === 'jobs' ? 'text-purple-500 bg-purple-50' : 'text-stone-400 hover:text-stone-600'}`}
          >
            <Briefcase size={22} />
            <span className="text-[10px] mt-1 font-medium">취업</span>
          </button>
          <button 
            onClick={() => setActiveTab('connect')}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all ${activeTab === 'connect' ? 'text-indigo-500 bg-indigo-50' : 'text-stone-400 hover:text-stone-600'}`}
          >
            <Users size={22} />
            <span className="text-[10px] mt-1 font-medium">연대</span>
          </button>
          <button 
            onClick={() => setActiveTab('garden')}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all ${activeTab === 'garden' ? 'text-amber-500 bg-amber-50' : 'text-stone-400 hover:text-stone-600'}`}
          >
            <TreeDeciduous size={22} />
            <span className="text-[10px] mt-1 font-medium">정원</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
