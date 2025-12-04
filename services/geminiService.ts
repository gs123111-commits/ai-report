
import { GoogleGenAI, Type } from "@google/genai";
import { ShredderResponse, ExperienceTranslation, SocialScriptResponse, JobBuff, JobCoachingResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Model configuration
const TEXT_MODEL = 'gemini-2.5-flash';

export const generateComfortingResponse = async (worryText: string): Promise<ShredderResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: `The user is feeling anxious about: "${worryText}". 
      Provide a very short, warm, and empathetic comforting message (under 50 characters) in Korean.
      Then, suggest one extremely small micro-step action (e.g., "take one deep breath") to help them.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            comfortMessage: { type: Type.STRING },
            actionItem: { type: Type.STRING },
          },
          required: ["comfortMessage", "actionItem"]
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) throw new Error("No response from AI");
    return JSON.parse(jsonStr) as ShredderResponse;

  } catch (error) {
    console.error("Gemini Shredder Error:", error);
    return {
      comfortMessage: "괜찮아요, 이 감정도 곧 지나갈 거예요.",
      actionItem: "따뜻한 물 한 잔 마시기"
    };
  }
};

export const translateExperience = async (rawExperience: string): Promise<ExperienceTranslation[]> => {
  try {
    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: `The user describes their unofficial experience (gaming, fangirling, resting) as: "${rawExperience}".
      Translate this into professional "soft skills" or "competencies" for a resume.
      Re-frame it positively. Return a JSON array of objects with 'skill' and 'description' keys.
      Limit to 3 items. Language: Korean.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              skill: { type: Type.STRING },
              description: { type: Type.STRING }
            }
          }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) throw new Error("No response from AI");
    const result = JSON.parse(jsonStr) as ExperienceTranslation[];
    // Append original text for context if needed, though not returned by AI
    return result.map(r => ({ ...r, originalText: rawExperience }));

  } catch (error) {
    console.error("Gemini Translator Error:", error);
    return [
      { skill: "잠재력 탐색", description: "충분한 휴식을 통해 다음 도약을 준비했습니다." }
    ];
  }
};

export const generateSocialScript = async (situation: string): Promise<SocialScriptResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: `The user needs a social script for this situation: "${situation}".
      Write a polite, natural Korean script they can read. 
      Also provide 1 small tip to reduce anxiety.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            script: { type: Type.STRING },
            tips: { type: Type.STRING }
          }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) throw new Error("No response from AI");
    return JSON.parse(jsonStr) as SocialScriptResponse;
  } catch (error) {
    return {
      script: "안녕하세요, 문의드릴 게 있어서 전화드렸습니다.",
      tips: "말하기 전에 심호흡을 한 번 크게 해보세요."
    };
  }
};

export const getJobBuffs = async (): Promise<JobBuff[]> => {
  // Simulated dynamic response based on "Resting" context
  return [
    { name: "회복 탄력성", score: 95, description: "긴 휴식을 통해 번아웃을 예방할 줄 아는 능력" },
    { name: "깊은 몰입", score: 88, description: "좋아하는 것에 깊게 파고드는 집중력" },
    { name: "디지털 문해력", score: 92, description: "다양한 온라인 정보를 빠르게 습득하는 능력" }
  ];
};

export const generateJobCoaching = async (jobTitle: string, successfulSpecs: string[]): Promise<JobCoachingResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: `The user is interested in the job "${jobTitle}". 
      Successful candidates usually have these specs: ${successfulSpecs.join(', ')}.
      
      1. Provide a short "encouragement" message (Korean) saying they can do it.
      2. Provide a "gapAnalysis" (Korean) gently explaining how their current latent potential connects to these specs (don't say they lack it, say what to prepare).
      3. Provide a 3-step "roadmap" (Korean) of very small micro-steps to get closer to these specs.
      
      Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            encouragement: { type: Type.STRING },
            gapAnalysis: { type: Type.STRING },
            roadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  step: { type: Type.STRING },
                  action: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) throw new Error("No response from AI");
    return JSON.parse(jsonStr) as JobCoachingResponse;
  } catch (error) {
    console.error("Job Coaching Error", error);
    return {
      encouragement: "당신은 이미 충분한 가능성을 가지고 있어요.",
      gapAnalysis: "이 직무는 꼼꼼함이 중요해요. 당신의 섬세함이 큰 무기가 될 거예요.",
      roadmap: [
        { step: "Step 1", action: "관련 분야 유튜브 영상 1개 보기" },
        { step: "Step 2", action: "하루 10분 관련 기사 읽기" },
        { step: "Step 3", action: "자신만의 강점 3가지 적어보기" }
      ]
    };
  }
};
