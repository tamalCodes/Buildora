
import React from 'react';

interface AuthContainerProps {
  children: React.ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 lg:p-10 relative">
      <div className="w-full max-w-[1100px] min-h-[700px] flex flex-col lg:flex-row glass-card rounded-[2.5rem] overflow-hidden animate-in fade-in zoom-in-95 duration-700">
        
        {/* Left Side: Branding & Credibility */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden bg-white/[0.02]">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full"></div>
          </div>

          <div className="relative z-10 space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)] border border-indigo-400/30">
                <div className="w-5 h-5 border-[2.5px] border-white rounded-lg"></div>
              </div>
              <span className="text-white font-geist font-black text-3xl tracking-tighter">Buildora</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-geist font-black text-white leading-[1.1] tracking-tighter">
                The Platform for <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-cyan-400">Global Communities.</span>
              </h1>
              <p className="text-slate-400 text-lg font-medium max-w-sm leading-relaxed">
                Host professional hackathons, manage developer ecosystems, and scale local events with high-performance infrastructure.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-12 lg:mt-0">
            <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=user${i}`} className="w-8 h-8 rounded-full border-2 border-slate-900" alt="User" />
                  ))}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                  Trusted by 2k+ Organizers
                </p>
              </div>
              <blockquote className="text-slate-300 text-sm italic font-medium leading-relaxed">
                "Buildora transformed how we engage our developers. It's the standard for professional dev-focused infrastructure."
              </blockquote>
            </div>
          </div>
        </div>

        {/* Right Side: Authentication Flow */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex items-center bg-white/[0.01] border-l border-white/5">
          <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
