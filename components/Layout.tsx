import React from 'react';
import { Persona, PersonaType } from '../types';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  personas: Persona[];
  activePersonaId: PersonaType;
  setActivePersonaId: (id: PersonaType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, personas, activePersonaId, setActivePersonaId }) => {
  return (
    <div className="flex h-screen">
      <Sidebar 
        personas={personas} 
        activePersonaId={activePersonaId} 
        setActivePersonaId={setActivePersonaId} 
      />
      <main className="flex-1 flex flex-col bg-brand-bg/80 backdrop-blur-sm">
        {children}
      </main>
    </div>
  );
};

export default Layout;