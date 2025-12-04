import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 현재 디렉토리의 환경 변수 로드
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
    define: {
      // 코드 내의 process.env.API_KEY를 실제 값으로 문자열 치환
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      // process.env를 참조하는 라이브러리들이 브라우저에서 오류를 내지 않도록 빈 객체로 방어
      'process.env': {},
    }
  };
});