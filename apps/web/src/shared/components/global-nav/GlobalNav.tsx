import { UserType } from "@buildora/shared";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo";
import GlobalSearchBar from "../search/GlobalSearchBar";
import { NAV_ITEMS } from "./constants";
import type { GlobalNavProps } from "./types";

const GlobalNav: React.FC<GlobalNavProps> = ({ user, onSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
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
    setIsUserMenuOpen(false);
  };

  const handleSignOutClick = () => {
    setIsUserMenuOpen(false);
    onSignOut();
  };

  useEffect(() => {
    if (!isUserMenuOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isUserMenuOpen]);

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
        <div className="w-[280px]">
          <GlobalSearchBar />
        </div>
        {user ? (
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              className="flex items-center gap-3 pl-4 border-l border-white/10 hover:opacity-80 transition-opacity"
              onClick={() => setIsUserMenuOpen((open) => !open)}
              aria-expanded={isUserMenuOpen}
              aria-haspopup="menu"
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
            </button>

            {isUserMenuOpen && (
              <div
                className="absolute right-0 mt-3 w-72 rounded-2xl border border-white/10 bg-[#0a111d]/95 shadow-[0_20px_60px_rgba(4,8,20,0.6)] backdrop-blur-xl overflow-hidden"
                role="menu"
              >
                <div className="px-4 py-4 border-b border-white/10">
                  <p className="text-[11px] font-black text-white uppercase tracking-[0.18em]">
                    Account
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {userLabel}
                  </p>
                </div>
                <div className="px-3 py-3 space-y-1">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={handleNavClick}
                    role="menuitem"
                  >
                    <svg
                      className="h-4 w-4 text-indigo-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                    My Buildora
                  </Link>
                  <Link
                    to="/hackathons"
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={handleNavClick}
                    role="menuitem"
                  >
                    <svg
                      className="h-4 w-4 text-indigo-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20l9-7-9-7-9 7 9 7z" />
                      <path d="M12 4v16" />
                    </svg>
                    Hackathons
                  </Link>
                  <Link
                    to="/builders"
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={handleNavClick}
                    role="menuitem"
                  >
                    <svg
                      className="h-4 w-4 text-indigo-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 12h6" />
                      <path d="M12 9v6" />
                      <rect x="3" y="3" width="18" height="18" rx="4" />
                    </svg>
                    Builders
                  </Link>
                </div>
                <div className="border-t border-white/10 px-3 py-3 space-y-1">
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
                    onClick={handleNavClick}
                    role="menuitem"
                  >
                    <svg
                      className="h-4 w-4 text-indigo-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V22a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H2a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3 1.7 1.7 0 0 0 1-1.5V2a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8 1.7 1.7 0 0 0 1.5 1H22a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
                    </svg>
                    Account Settings
                  </Link>
                  <button
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-rose-200 hover:bg-rose-500/10 hover:text-rose-100 transition-colors"
                    onClick={handleSignOutClick}
                    role="menuitem"
                    type="button"
                  >
                    <svg
                      className="h-4 w-4 text-rose-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <path d="M16 17l5-5-5-5" />
                      <path d="M21 12H9" />
                    </svg>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
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
                    to="/profile"
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
