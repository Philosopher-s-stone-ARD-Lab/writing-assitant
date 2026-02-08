import React from 'react';
import { Persona } from '../types';

interface HeaderProps {
  persona: Persona;
}

const Header: React.FC<HeaderProps> = ({ persona }) => {
  return (
    <header className="p-4 border-b border-white/10 bg-brand-surface/50 backdrop-blur-sm">
      <h2 className="text-2xl font-serif font-bold text-white">{persona.name}</h2>
      <p className="text-sm text-brand-subtle font-sans">{persona.description}</p>
    </header>
  );
};

export default Header;