import React, { useState, useEffect } from 'react';
import { ScanFace } from 'lucide-react';

const PosturePolice: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Simulated random check (In a real app, this would use TensorFlow.js PoseNet)
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setMessage("어깨가 조금 굽은 것 같아요! 기지개 쭈욱~");
        setTimeout(() => setMessage(null), 4000);
      }
    }, 30000); // Check every 30s

    return () => clearInterval(interval);
  }, []);

  if (!message) return null;

  return (
    <div className="fixed top-20 right-4 z-40 bg-indigo-600/90 text-white px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3 animate-float max-w-[200px]">
      <div className="bg-white/20 p-1.5 rounded-full">
        <ScanFace size={18} />
      </div>
      <p className="text-xs font-medium">{message}</p>
    </div>
  );
};

export default PosturePolice;
