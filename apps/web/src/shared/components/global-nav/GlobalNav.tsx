import { UserType } from "@buildora/shared";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo";
import GlobalSearchBar from "../search/GlobalSearchBar";
import ThemeToggle from "../ThemeToggle";
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
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-(--text-heading)"
        : "text-(--nav-inactive) hover:text-(--text-heading)"
    }`;
  const mobileNavLinkClasses = (isActive: boolean) =>
    `block rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
      isActive
        ? "border-(--accent-border) bg-(--accent-bg-soft) text-(--text-heading)"
        : "border-transparent text-(--text-primary) hover:border-(--border-default) hover:bg-(--bg-input)"
    }`;

  const handleNavClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleSignOutClick = () => {
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    onSignOut?.();
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
    <nav className="fixed left-0 right-0 top-[var(--maintenance-banner-offset)] z-50 h-16 border-b border-(--border-subtle) bg-(--nav-bg) backdrop-blur-xl flex items-center px-6 lg:px-10 justify-between">
      <div className="flex items-center gap-8">
        <Link
          className="flex items-center"
          to="/explore"
          aria-label="Go to Explore"
          onClick={handleNavClick}
        >
          <Logo size="sm" />
        </Link>
        <div className="hidden md:flex items-center gap-6">
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

      <div className="hidden md:flex items-center gap-3">
        <div className="w-60">
          <GlobalSearchBar showShortcut={true} />
        </div>
        <ThemeToggle />
        {user ? (
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              className="flex items-center gap-2.5 ml-1 hover:opacity-80 transition-opacity"
              onClick={() => setIsUserMenuOpen((open) => !open)}
              aria-expanded={isUserMenuOpen}
              aria-haspopup="menu"
            >
              <div className="text-right max-w-37.5">
                <p className="text-xs font-semibold text-(--text-heading) truncate">
                  {userLabel}
                </p>
                <p className="text-[10px] font-medium text-(--text-tertiary) capitalize">
                  {roleLabel}
                </p>
              </div>
              <img
                src={avatarUrl}
                className="w-8 h-8 rounded-full border border-(--border-default) object-cover"
                alt="User"
              />
            </button>

            {isUserMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-xl border border-(--border-default) bg-(--bg-elevated) shadow-lg overflow-hidden"
                role="menu"
              >
                <div className="px-4 py-3 border-b border-(--border-subtle)">
                  <p className="text-sm font-semibold text-(--text-heading)">
                    {userLabel}
                  </p>
                  <p className="text-xs text-(--text-tertiary) capitalize">
                    {roleLabel}
                  </p>
                </div>
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-(--text-secondary) hover:bg-(--bg-input) hover:text-(--text-heading) transition-colors"
                    onClick={handleNavClick}
                    role="menuitem"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-(--text-secondary) hover:bg-(--bg-input) hover:text-(--text-heading) transition-colors"
                    onClick={handleNavClick}
                    role="menuitem"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V22a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H2a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3 1.7 1.7 0 0 0 1-1.5V2a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8 1.7 1.7 0 0 0 1.5 1H22a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
                    </svg>
                    Settings
                  </Link>
                </div>
                <div className="border-t border-(--border-subtle) py-1">
                  <button
                    className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-rose-500 hover:bg-rose-500/10 transition-colors"
                    onClick={handleSignOutClick}
                    role="menuitem"
                    type="button"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            className="text-sm font-medium text-(--nav-inactive) hover:text-(--text-heading) transition-colors"
            onClick={handleNavClick}
          >
            Sign in
          </Link>
        )}
      </div>

      <button
        className="md:hidden p-2 rounded-lg text-(--text-secondary) hover:text-(--text-heading) hover:bg-(--bg-input) transition-all"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full border-b border-(--border-default) bg-(--bg-elevated) backdrop-blur-md shadow-[0_24px_40px_-24px_rgba(2,6,23,0.65)]">
          <div className="px-6 py-3.5 space-y-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                end
                onClick={handleNavClick}
                className={({ isActive }) => mobileNavLinkClasses(isActive)}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-3 border-t border-(--border-subtle) pt-3 space-y-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/profile"
                      className="min-w-0 flex-1 flex items-center gap-2.5 rounded-xl border border-(--border-default) bg-(--bg-input) px-3 py-2"
                      onClick={handleNavClick}
                    >
                      <img
                        src={avatarUrl}
                        className="h-7 w-7 rounded-full border border-(--border-default) object-cover"
                        alt="User"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-(--text-heading)">
                          {userLabel}
                        </p>
                        <p className="text-[11px] text-(--text-tertiary) capitalize">
                          {roleLabel}
                        </p>
                      </div>
                    </Link>
                    <ThemeToggle className="shrink-0" />
                  </div>
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-500/15 hover:text-rose-500"
                    onClick={handleSignOutClick}
                    type="button"
                  >
                    <svg
                      className="h-4 w-4"
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
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/explore"
                    className="flex-1 rounded-xl border border-transparent px-3 py-2 text-sm font-semibold text-(--text-primary) hover:border-(--border-default) hover:bg-(--bg-input) transition-colors"
                    onClick={handleNavClick}
                  >
                    Sign in
                  </Link>
                  <ThemeToggle className="shrink-0" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default GlobalNav;
