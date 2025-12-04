import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Vercel 환경변수(process.env)를 클라이언트 사이드 코드에서 사용할 수 있도록 치환
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});