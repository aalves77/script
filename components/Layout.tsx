
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-red-900/30 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-sm rotate-45 flex items-center justify-center mr-3 neon-border">
              <span className="rotate-[-45deg] font-black text-white text-xs">NOVA</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white">
              <span className="text-red-600">PRO</span> PANEL <span className="text-[10px] text-red-500/50 uppercase tracking-widest font-normal">v4.2.0</span>
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8 text-xs font-bold tracking-widest">
            <a href="#" className="text-red-500 hover:text-white transition-colors uppercase">Console</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors uppercase">Configs</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors uppercase">Bypass</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors uppercase">Support</a>
          </nav>
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase mono-font">System Online</span>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center opacity-50 text-[10px] uppercase tracking-widest">
          <p>© 2024 Nova Pro Technologies. For educational purposes only.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-red-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-red-500 transition-colors">EULA</a>
            <a href="#" className="hover:text-red-500 transition-colors">Github</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
