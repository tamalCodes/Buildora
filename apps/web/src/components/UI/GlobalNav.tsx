import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';

type NavItem = {
  label: string;
  path: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Discover', path: '/explore' },
  { label: 'Hackathons', path: '/hackathons' },
  { label: 'Builders', path: '/builders' }
];

const GlobalNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClasses = (isActive: boolean) =>
    `text-xs font-black uppercase tracking-[0.2em] transition-all hover:translate-y-[-1px] ${
      isActive ? 'text-indigo-400' : 'text-slate-500 hover:text-white'
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#05060c]/80 backdrop-blur-xl border-b border-white/5 flex items-center px-6 lg:px-12 justify-between relative">
      <div className="flex items-center gap-10">
        <Link className="flex items-center" to="/explore" aria-label="Go to Explore">
          <Logo size="md" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => navLinkClasses(isActive)}
              end
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <Button variant="outline" className="hidden lg:inline-flex !px-5 !py-2.5 !text-xs !rounded-xl">Launch project</Button>
        <button className="flex items-center gap-3 pl-4 border-l border-white/10 hover:opacity-80 transition-opacity">
          <div className="text-right">
            <p className="text-[11px] font-black text-white uppercase tracking-tighter">tamalCodes</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Builder</p>
          </div>
          <img src="https://i.pravatar.cc/150?u=tamal" className="w-9 h-9 rounded-xl border-2 border-indigo-500/20 shadow-lg shadow-indigo-500/10" alt="User" />
        </button>
      </div>

      <button
        className="md:hidden p-2 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/40 transition-all"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 border-b border-white/10 bg-[#05060c]/95 backdrop-blur-xl">
          <div className="px-6 py-6 space-y-4">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                end
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `w-full text-left text-xs font-black uppercase tracking-[0.2em] transition-all ${
                    isActive ? 'text-indigo-400' : 'text-slate-400'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <Button variant="outline" className="!px-5 !py-2.5 !text-xs !rounded-xl">Launch project</Button>
              <button className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-2">
                <img src="https://i.pravatar.cc/150?u=tamal" className="w-8 h-8 rounded-xl border border-indigo-500/20" alt="User" />
                <div className="text-left">
                  <p className="text-[11px] font-black text-white uppercase tracking-tighter">tamalCodes</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Builder</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default GlobalNav;
