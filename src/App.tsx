import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Dices, Leaf, Sparkles, Hexagon } from 'lucide-react';

type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

export default function App() {
  const [numDice, setNumDice] = useState<1 | 2>(2);
  const [diceValues, setDiceValues] = useState<DiceValue[]>([6, 4]);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = (count: 1 | 2) => {
    if (isRolling) return;
    
    setNumDice(count);
    setIsRolling(true);
    
    if (diceValues.length !== count) {
      setDiceValues(Array.from({ length: count }, () => 1) as DiceValue[]);
    }
    
    let rolls = 0;
    const maxRolls = 12;
    const interval = setInterval(() => {
      const newValues = Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1) as DiceValue[];
      setDiceValues(newValues);
      
      rolls++;
      if (rolls >= maxRolls) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 50);
  };

  const getDiceIcon = (value: number, className: string) => {
    switch (value) {
      case 1: return <Dice1 className={className} />;
      case 2: return <Dice2 className={className} />;
      case 3: return <Dice3 className={className} />;
      case 4: return <Dice4 className={className} />;
      case 5: return <Dice5 className={className} />;
      case 6: return <Dice6 className={className} />;
      default: return <Dice1 className={className} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0c2a1a] via-[#05140b] to-[#020804] text-[#e1e1e6] font-sans flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#06b6d4]/60 to-transparent"></div>

      {/* Magical Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 left-10 opacity-20 text-[#a3e635]">
          <Leaf className="w-24 h-24" />
        </motion.div>
        <motion.div animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 right-10 opacity-20 text-[#22c55e]">
          <Leaf className="w-32 h-32" />
        </motion.div>
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 right-1/4 text-[#06b6d4]">
          <Sparkles className="w-12 h-12" />
        </motion.div>
        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-1/3 left-1/4 text-[#d4af37]">
          <Sparkles className="w-8 h-8" />
        </motion.div>
      </div>

      {/* Header Layout */}
      <header className="mb-10 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Hexagon className="w-4 h-4 text-[#d4af37]/80" />
          <div className="text-[11px] uppercase tracking-[0.4em] text-[#d4af37]/90 font-semibold">AuraSwarm Utility</div>
          <Hexagon className="w-4 h-4 text-[#d4af37]/80" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-white drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">Swarm Dice</h1>
      </header>

      <div className="w-full max-w-md bg-[#0a1e12]/80 backdrop-blur-xl border border-[#d4af37]/30 rounded-3xl p-8 sm:p-10 shadow-[0_0_40px_rgba(6,182,212,0.1)] relative z-10 flex flex-col items-center">
        
        {/* Dice Display */}
        <div className="flex justify-center items-center gap-8 mb-10 h-32 w-full">
          <AnimatePresence mode="popLayout">
            {diceValues.map((val, i) => (
              <motion.div
                key={`dice-${i}-${numDice}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  rotate: isRolling ? 10 : 0,
                  y: isRolling ? -5 : 0
                }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 20
                }}
                className="relative w-28 h-28 shrink-0 bg-gradient-to-br from-[#064e3b] to-[#022c22] border-2 border-[#06b6d4]/60 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.25)] text-[#e0f2fe]"
              >
                {/* Glow behind dice */}
                <div className="absolute inset-0 bg-[#06b6d4]/20 blur-xl rounded-full"></div>
                <div className="relative z-10 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                  {getDiceIcon(val, "w-16 h-16")}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Result */}
        <div className="text-center mb-10 h-28 flex items-center justify-center w-full">
          {!isRolling ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-2"
            >
              {numDice === 1 ? (
                <>
                  <div className="text-[11px] uppercase tracking-widest text-[#a1a1aa] font-medium">You rolled a...</div>
                  <div className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-[#d4af37] drop-shadow-sm leading-none">{diceValues[0]}</div>
                </>
              ) : (
                <>
                  <div className="text-[11px] uppercase tracking-widest text-[#a1a1aa] font-medium">
                    Rolled {diceValues[0]} and {diceValues[1]}
                  </div>
                  <div className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-[#d4af37] drop-shadow-sm leading-none">{Math.max(diceValues[0], diceValues[1])}</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#06b6d4] font-semibold flex items-center gap-2">
                    <Sparkles className="w-3 h-3" />
                    Take the highest!
                    <Sparkles className="w-3 h-3" />
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <div className="text-[12px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold animate-pulse flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              Channeling...
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-4 w-full">
          <button
            onClick={() => rollDice(1)}
            disabled={isRolling}
            className="flex-1 py-4 px-4 rounded-xl bg-[#113220] hover:bg-[#16422a] active:bg-[#0d2618] text-[#e1e1e6] text-[10px] sm:text-xs font-semibold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 disabled:opacity-50 border border-[#d4af37]/20 shadow-inner"
          >
            Roll 1 Dice
          </button>
          <button
            onClick={() => rollDice(2)}
            disabled={isRolling}
            className="flex-1 py-4 px-4 rounded-xl bg-gradient-to-r from-[#0891b2] to-[#0369a1] hover:from-[#0e7490] hover:to-[#075985] active:from-[#155e75] active:to-[#0c4a6e] text-white font-bold text-[10px] sm:text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(8,145,178,0.3)] border border-[#06b6d4]/50"
          >
            Roll 2 (Insight)
          </button>
        </div>

      </div>

      {/* Subtext/Footer */}
      <footer className="mt-12 opacity-60 flex items-center gap-4 text-[10px] font-medium tracking-wider relative z-10 text-[#e1e1e6]">
        <span className="text-[#a3e635]">NATURE</span>
        <div className="w-1 h-1 bg-[#d4af37] rounded-full"></div>
        <span className="text-[#06b6d4]">MAGIC</span>
        <div className="w-1 h-1 bg-[#d4af37] rounded-full"></div>
        <span>AURASWARM.CA</span>
      </footer>

    </div>
  );
}
