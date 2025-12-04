import React, { useState } from 'react';
import { Heart, Archive } from 'lucide-react';
import { FailurePost } from '../types';

const MuseumOfFailure: React.FC = () => {
  const [posts, setPosts] = useState<FailurePost[]>([
    { id: 1, content: "오늘도 알람 듣고 다시 잤다. 12시에 일어남...", cheers: 12, isMine: false },
    { id: 2, content: "면접 보러 가다가 너무 무서워서 돌아옴", cheers: 24, isMine: false },
    { id: 3, content: "운동 등록하고 3일째 안 가는 중", cheers: 5, isMine: false },
  ]);

  const [newPost, setNewPost] = useState('');

  const addPost = () => {
    if (!newPost.trim()) return;
    setPosts([{ id: Date.now(), content: newPost, cheers: 0, isMine: true }, ...posts]);
    setNewPost('');
  };

  const cheerPost = (id: number) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, cheers: p.cheers + 1 } : p));
  };

  return (
    <div className="bg-white border border-stone-200 p-6 rounded-3xl h-[400px] flex flex-col shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-stone-100 rounded-full text-stone-500">
          <Archive size={20} />
        </div>
        <div>
          <h3 className="text-stone-800 font-medium">실패 박물관</h3>
          <p className="text-xs text-stone-500">우리의 실패는 부끄럽지 않아요</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-stone-200">
        {posts.map(post => (
          <div key={post.id} className={`p-4 rounded-xl border ${post.isMine ? 'bg-stone-50 border-stone-200' : 'bg-white border-stone-100 shadow-sm'}`}>
            <p className="text-sm text-stone-600 mb-3 font-light">"{post.content}"</p>
            <button 
              onClick={() => cheerPost(post.id)}
              className="flex items-center gap-1.5 text-xs text-rose-500 hover:bg-rose-50 px-2 py-1 rounded-full w-fit transition-colors"
            >
              <Heart size={12} fill={post.cheers > 0 ? "currentColor" : "none"} />
              <span>{post.cheers}명이 공감해요</span>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input 
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="오늘의 작은 실패를 전시해보세요"
          className="flex-1 bg-stone-50 rounded-xl px-4 text-sm text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-300 border border-stone-200"
        />
        <button onClick={addPost} disabled={!newPost} className="px-4 py-2 bg-stone-800 text-stone-100 rounded-xl text-xs hover:bg-stone-700">
          전시
        </button>
      </div>
    </div>
  );
};

export default MuseumOfFailure;