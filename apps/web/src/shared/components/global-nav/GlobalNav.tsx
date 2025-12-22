import { UserType } from "@buildora/shared";
import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo";
import { NAV_ITEMS } from "./constants";
import type { GlobalNavProps } from "./types";

const GlobalNav: React.FC<GlobalNavProps> = ({ user, onSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userLabel = user?.name || user?.email || "Guest";
  const roleLabel =
    user?.userType === UserType.ORGANIZATION ? "Organization" : "Builder";

  const avatarUrl = useMemo(() => {
    if (user?.avatarUrl) return user.avatarUrl;
    const seed = user?.email || "guest";
    return `https://i.pravatar.cc/150?u=${encodeURIComponent(seed)}`;
  }, [user?.avatarUrl, user?.email]);

  const navLinkClasses = (isActive: boolean) =>
    `text-xs font-black uppercase tracking-[0.2em] transition-all hover:translate-y-[-1px] ${
      isActive ? "text-indigo-400" : "text-slate-500 hover:text-white"
    }`;
  const handleNavClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#05060c]/80 backdrop-blur-xl border-b border-white/5 flex items-center px-6 lg:px-12 justify-between relative">
      <div className="flex items-center gap-10">
        <Link
          className="flex items-center"
          to="/explore"
          aria-label="Go to Explore"
          onClick={handleNavClick}
        >
          <Logo size="md" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => navLinkClasses(isActive)}
              end
              onClick={handleNavClick}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6">
        {user ? (
          <>
            <Link
              to="/settings"
              className="flex items-center gap-3 pl-4 border-l border-white/10 hover:opacity-80 transition-opacity"
              onClick={handleNavClick}
            >
              <div className="text-right max-w-[160px]">
                <p className="text-[11px] font-black text-white uppercase tracking-tighter truncate">
                  {userLabel}
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {roleLabel}
                </p>
              </div>
              <img
                src={avatarUrl}
                className="w-9 h-9 rounded-xl border-2 border-indigo-500/20 shadow-lg shadow-indigo-500/10 object-cover"
                alt="User"
              />
            </Link>
            <button
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
              onClick={onSignOut}
            >
              Sign out
            </button>
          </>
        ) : (
          <Link
            to="/explore"
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
            onClick={handleNavClick}
          >
            Sign in
          </Link>
        )}
      </div>

      <button
        className="md:hidden p-2 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/40 transition-all"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M4 6h16M4 12h16M4 18h16"
          />
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
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `w-full text-left text-xs font-black uppercase tracking-[0.2em] transition-all ${
                    isActive ? "text-indigo-400" : "text-slate-400"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              {user ? (
                <>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-2"
                    onClick={handleNavClick}
                  >
                    <img
                      src={avatarUrl}
                      className="w-8 h-8 rounded-xl border border-indigo-500/20 object-cover"
                      alt="User"
                    />
                    <div className="text-left max-w-[200px]">
                      <p className="text-[11px] font-black text-white uppercase tracking-tighter truncate">
                        {userLabel}
                      </p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {roleLabel}
                      </p>
                    </div>
                  </Link>
                  <button
                    className="text-left text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                    onClick={onSignOut}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link
                  to="/explore"
                  className="text-left text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                  onClick={handleNavClick}
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default GlobalNav;
