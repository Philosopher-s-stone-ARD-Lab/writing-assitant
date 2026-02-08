import React, { useState, useEffect } from 'react';
import { PersonaType, ChatMessage, AllChatHistories } from './types';
import { PERSONAS } from './constants';
import Layout from './components/Layout';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';

const CHAT_STORAGE_KEY = 'chatHistories';

const App: React.FC = () => {
  const [activePersonaId, setActivePersonaId] = useState<PersonaType>(PersonaType.ASSISTANT);

  const [allHistories, setAllHistories] = useState<AllChatHistories>(() => {
    try {
      const savedHistories = localStorage.getItem(CHAT_STORAGE_KEY);
      if (savedHistories) {
        return JSON.parse(savedHistories);
      }
    } catch (error) {
      console.error("Could not load chat histories from localStorage", error);
    }

    const initialHistories = {} as AllChatHistories;
    for (const persona of PERSONAS) {
      initialHistories[persona.id] = [{ role: 'model', content: persona.initialMessage }];
    }
    return initialHistories;
  });
  
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(allHistories));
    } catch (error) {
      console.error("Could not save chat histories to localStorage", error);
    }
  }, [allHistories]);

  const activePersona = PERSONAS.find(p => p.id === activePersonaId) || PERSONAS[0];
  const activeHistory = allHistories[activePersonaId] || [{ role: 'model', content: activePersona.initialMessage }];

  const handleSetMessages = (newMessages: ChatMessage[]) => {
    setAllHistories(prevHistories => ({
      ...prevHistories,
      [activePersonaId]: newMessages,
    }));
  };

  return (
    <Layout
      personas={PERSONAS}
      activePersonaId={activePersonaId}
      setActivePersonaId={setActivePersonaId}
    >
      <div className="flex flex-col h-full">
        <Header persona={activePersona} />
        <ChatInterface
          key={activePersona.id}
          persona={activePersona}
          messages={activeHistory}
          setMessages={handleSetMessages}
          allHistories={allHistories}
        />
      </div>
    </Layout>
  );
};

export default App;
