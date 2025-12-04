import React, { useRef, useState, useEffect } from 'react';
import { Sun, CheckCircle, Camera, Loader2 } from 'lucide-react';

interface SunlightCheckInProps {
  onComplete: () => void;
  isCompleted: boolean;
}

const SunlightCheckIn: React.FC<SunlightCheckInProps> = ({ onComplete, isCompleted }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [brightness, setBrightness] = useState(0);
  const [statusMessage, setStatusMessage] = useState("카메라 권한을 허용해주세요");

  // Effect to handle camera start AFTER the component updates (and video tag exists)
  useEffect(() => {
    let stream: MediaStream | null = null;

    const initCamera = async () => {
      if (isActive && videoRef.current) {
        setIsLoading(true);
        try {
          // Attempt to use environment (rear) camera, fall back to user (front)
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              facingMode: 'environment',
              width: { ideal: 640 },
              height: { ideal: 480 }
            } 
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            // Wait for video to be ready to play
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play();
              setIsLoading(false);
              setStatusMessage("아침 햇살을 비춰주세요");
            };
          }
        } catch (err) {
          console.error("Camera access denied or failed", err);
          setStatusMessage("카메라를 켤 수 없어요. 설정을 확인해주세요.");
          setIsLoading(false);
        }
      }
    };

    if (isActive) {
      initCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isActive]);

  const analyzeBrightness = () => {
    if (!videoRef.current || videoRef.current.readyState !== 4) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let r, g, b, avg;
    let colorSum = 0;

    // Sample pixels for performance
    for (let x = 0, len = data.length; x < len; x += 40) {
      r = data[x];
      g = data[x + 1];
      b = data[x + 2];
      avg = Math.floor((r + g + b) / 3);
      colorSum += avg;
    }

    const sampleCount = data.length / 40;
    const brightnessScore = Math.floor(colorSum / sampleCount);
    setBrightness(brightnessScore);

    if (brightnessScore > 100) { // Threshold for "Sunlight"
      // Stop camera handled by component unmount/state change
      setIsActive(false);
      onComplete();
    }
  };

  useEffect(() => {
    let interval: number | undefined;
    if (isActive && !isLoading) {
      interval = window.setInterval(analyzeBrightness, 500);
    }
    return () => {
      if (interval !== undefined) clearInterval(interval);
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, isLoading]);

  if (isCompleted) {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-6 rounded-3xl flex items-center justify-between shadow-sm animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-100 rounded-full text-amber-500">
            <Sun size={24} />
          </div>
          <div>
            <h3 className="text-amber-900 font-medium">햇살 충전 완료</h3>
            <p className="text-amber-700/60 text-xs mt-1">세로토닌이 생성되고 있어요</p>
          </div>
        </div>
        <CheckCircle className="text-amber-500" size={24} />
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-200 p-6 rounded-3xl relative overflow-hidden shadow-sm transition-all duration-300">
      {!isActive ? (
        <div className="flex flex-col items-center text-center gap-4 animate-fade-in">
          <div className="p-4 bg-orange-50 rounded-full text-orange-400 animate-pulse">
            <Sun size={32} />
          </div>
          <div>
            <h3 className="text-stone-800 font-medium">햇살 로그인</h3>
            <p className="text-stone-500 text-sm mt-1">창문을 열고 빛을 보여주세요</p>
          </div>
          <button 
            onClick={() => setIsActive(true)}
            className="w-full py-3 bg-stone-800 hover:bg-stone-700 text-stone-100 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Camera size={18} />
            카메라 켜기
          </button>
        </div>
      ) : (
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black animate-fade-in">
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-4">
             {isLoading ? (
               <div className="flex flex-col items-center gap-2">
                 <Loader2 className="text-white animate-spin" size={32} />
                 <p className="text-white/80 text-sm font-medium">카메라 연결 중...</p>
               </div>
             ) : (
               <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full mt-auto mb-4">
                 <p className="text-white font-medium text-sm flex items-center gap-2">
                   <Sun size={16} className={brightness > 80 ? "text-yellow-400" : "text-white"} />
                   밝기 감지 중... ({brightness})
                 </p>
               </div>
             )}
          </div>
          
          <button 
             onClick={() => setIsActive(false)}
             className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
          >
             <span className="text-xs font-bold px-2">닫기</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SunlightCheckIn;