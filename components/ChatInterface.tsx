import React, { useState, useEffect, useRef } from 'react';
import { Persona, ChatMessage, AllChatHistories } from '../types';
import { getChatResponse } from '../services/geminiService';
import { SendIcon } from './Icons';

interface ChatInterfaceProps {
  persona: Persona;
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
  allHistories: AllChatHistories;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ persona, messages, setMessages, allHistories }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(persona, newMessages, allHistories);
      setMessages([...newMessages, { role: 'model', content: response }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'model', content: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 font-serif text-lg">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
             <div className="flex items-end max-w-xl lg:max-w-2xl">
              <div className={`px-5 py-3 rounded-2xl shadow-md ${
                msg.role === 'user' ? 'bg-brand-primary text-black rounded-bl-none' : 'bg-brand-surface text-brand-text rounded-br-none'
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
         {isLoading && (
            <div className="flex justify-end">
                <div className="max-w-xl lg:max-w-2xl px-4 py-3 rounded-2xl bg-brand-surface text-brand-text rounded-br-none">
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="mt-4 flex items-center gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend(e);
            }
          }}
          placeholder="اكتب رسالتك هنا..."
          className="flex-1 p-3 bg-brand-surface border border-white/10 rounded-lg resize-none focus:ring-2 focus:ring-brand-primary focus:outline-none text-brand-text placeholder-brand-subtle font-sans"
          rows={1}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-3 bg-brand-primary text-black rounded-full disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-brand-primary-hover transition-colors shadow-lg"
          aria-label="إرسال"
        >
          <SendIcon className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;