import React from 'react';

const Button = ({ text, textSize = 'text-lg', iconLink, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative p-1 text-white font-semibold rounded-full 
                 bg-gradient-to-b from-cyan-400/30 to-cyan-400/10
                 hover:from-cyan-400/40 hover:to-cyan-400/20
                 backdrop-blur-lg border border-cyan-400/30
                 transition-all duration-300 shadow-lg shadow-cyan-500/20
                 hover:shadow-cyan-500/40 hover:shadow-md"
    >
      <div className={`flex items-center gap-2 p-5 bg-black/30 rounded-full backdrop-blur-md ${textSize}`}>
        {text} {iconLink} 
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
      </div>
    </button>
  );
};

export default Button;