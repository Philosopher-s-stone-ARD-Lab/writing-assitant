import React from 'react';
import { Persona, PersonaType } from '../types';

interface SidebarProps {
  personas: Persona[];
  activePersonaId: PersonaType;
  setActivePersonaId: (id: PersonaType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ personas, activePersonaId, setActivePersonaId }) => {
  return (
    <aside className="w-80 bg-brand-surface p-4 border-l border-white/10 flex flex-col">
      <h1 className="text-3xl font-serif font-bold text-brand-primary mb-8 text-center">مساعد أسفار الوحدة والتكوين</h1>
      <nav className="flex flex-col space-y-2">
        {personas.map((persona) => (
          <button
            key={persona.id}
            onClick={() => setActivePersonaId(persona.id)}
            className={`flex items-center space-x-4 rtl:space-x-reverse p-3 rounded-lg text-right transition-all duration-300 transform hover:-translate-x-1 ${
              activePersonaId === persona.id
                ? 'bg-brand-primary/10 text-brand-primary border-r-4 border-brand-primary'
                : 'hover:bg-white/5 text-brand-text'
            }`}
          >
            <div className={`flex-shrink-0 transition-all duration-300 ${activePersonaId === persona.id ? 'transform scale-110' : ''}`}>{persona.avatar}</div>
            <div>
              <p className="font-semibold font-sans">{persona.name}</p>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;