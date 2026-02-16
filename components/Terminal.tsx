
import React, { useState, useEffect, useRef } from 'react';

interface TerminalProps {
  logs: string[];
}

export const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="bg-black/80 border border-zinc-800 rounded-lg p-4 h-[300px] overflow-y-auto mono-font text-[12px] scrollbar-hide">
      <div className="flex items-center space-x-2 mb-4 sticky top-0 bg-black/80 py-1">
        <div className="w-3 h-3 rounded-full bg-red-600/50"></div>
        <div className="w-3 h-3 rounded-full bg-orange-600/50"></div>
        <div className="w-3 h-3 rounded-full bg-green-600/50"></div>
        <span className="text-zinc-500 ml-2 font-bold uppercase tracking-widest text-[10px]">System_Debugger_v2</span>
      </div>
      <div className="space-y-1">
        {logs.map((log, i) => (
          <div key={i} className={`${log.startsWith('>') ? 'text-red-500' : 'text-zinc-400'}`}>
            <span className="text-zinc-600">[{new Date().toLocaleTimeString()}]</span> {log}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
