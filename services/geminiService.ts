import { GoogleGenAI, Chat, GenerateContentResponse, Content } from "@google/genai";
import { AllChatHistories, ChatMessage, Persona, PersonaType } from '../types';
import { PERSONAS } from "../constants";

let ai: GoogleGenAI | null = null;
try {
    const apiKey = process.env.API_KEY as string;
    if (!apiKey) {
        throw new Error("API key not found. Please ensure the environment is configured with an API_KEY.");
    }
    ai = new GoogleGenAI({ apiKey });
} catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
}

const modelName = 'gemini-2.5-flash';

export const getChatResponse = async (persona: Persona, history: ChatMessage[], allHistories?: AllChatHistories): Promise<string> => {
    if (!ai) {
        return "عذراً، لم يتم تكوين واجهة برمجة التطبيقات (API) بشكل صحيح. يرجى التأكد من تكوين مفتاح API بشكل صحيح.";
    }

    try {
        let systemInstruction = persona.systemInstruction;

        // For the main assistant, provide context from other chats.
        if (persona.id === PersonaType.ASSISTANT && allHistories) {
            const memoryContextParts: string[] = [];
            for (const personaKey in allHistories) {
                if (personaKey !== PersonaType.ASSISTANT) {
                    const personaInfo = PERSONAS.find(p => p.id === personaKey);
                    const personaHistory = allHistories[personaKey as PersonaType];
                    // Only include conversations that have started (more than just the initial message)
                    if (personaInfo && personaHistory.length > 1) {
                        const conversation = personaHistory
                            .slice(1) // skip initial message
                            .map(msg => `${msg.role === 'user' ? 'الكاتب' : personaInfo.name}: ${msg.content}`)
                            .join('\n');
                        memoryContextParts.push(`--- حوار مع ${personaInfo.name} ---\n${conversation}`);
                    }
                }
            }
            if (memoryContextParts.length > 0) {
                const memoryContext = memoryContextParts.join('\n\n');
                systemInstruction = `${persona.systemInstruction}\n\nأنت أيضا على علم بالحوارات التالية التي أجراها الكاتب مع المرشدين الآخرين. استخدم هذه السياقات لتقديم مساعدة أكثر شمولية:\n\n${memoryContext}`;
            }
        }

        const chatHistory: Content[] = history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }],
        }));

        const chat: Chat = ai.chats.create({
            model: modelName,
            config: {
                systemInstruction: systemInstruction,
            },
            history: chatHistory.slice(0, -1), // History without the last user message
        });

        const lastMessage = history[history.length - 1];
        if (!lastMessage || lastMessage.role !== 'user') {
            throw new Error("The last message must be from the user.");
        }
        
        const result = await chat.sendMessage({ message: lastMessage.content });
        return result.text;
    } catch (error) {
        console.error("Error getting chat response from Gemini:", error);
        return "حدث خطأ أثناء محاولة التواصل مع النموذج. يرجى المحاولة مرة أخرى.";
    }
};