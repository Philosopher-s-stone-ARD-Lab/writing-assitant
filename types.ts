
export enum PersonaType {
  ASSISTANT = 'ASSISTANT',
  OMAR = 'OMAR',
  MAARRI = 'MAARRI',
  SAID = 'SAID',
}

export interface Persona {
  id: PersonaType;
  name: string;
  description: string;
  avatar: React.ReactNode;
  systemInstruction: string;
  initialMessage: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export type AllChatHistories = {
  [key in PersonaType]: ChatMessage[];
};
