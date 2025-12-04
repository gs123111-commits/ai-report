import React from 'react';
import { Users } from 'lucide-react';

const MetaverseLibrary: React.FC = () => {
  // Mock users
  const users = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    color: ['bg-red-300', 'bg-blue-300', 'bg-green-300', 'bg-yellow-300', 'bg-purple-300'][i % 5]
  }));

  return (
    <div className="bg-white border border-stone-200 p-6 rounded-3xl relative overflow-hidden shadow-sm">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-200 to-transparent opacity-50" />
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
           <span className="text-stone-500 text-xs font-medium">현재 142명이 말없이 함께하고 있어요</span>
        </div>
        <Users size={16} className="text-stone-400" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {users.map((u) => (
          <div key={u.id} className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className={`w-10 h-10 rounded-full ${u.color} opacity-40 group-hover:opacity-60 transition-all flex items-center justify-center`}>
              <div className={`w-3 h-3 rounded-full ${u.color} opacity-100 brightness-90`} />
            </div>
            <div className="w-8 h-1 bg-stone-100 rounded-full" />
          </div>
        ))}
        {/* Me */}
        <div className="flex flex-col items-center gap-2">
           <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-300 animate-bounce-slow">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
           </div>
           <span className="text-[10px] text-emerald-600 font-bold">나</span>
        </div>
      </div>
      
      <p className="text-center text-stone-400 text-[10px] mt-6">
        이곳에서는 아무 말도 하지 않아도 괜찮아요. 그냥 존재하기만 하면 돼요.
      </p>
    </div>
  );
};

export default MetaverseLibrary;