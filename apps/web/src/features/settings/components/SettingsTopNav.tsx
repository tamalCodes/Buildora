import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { User } from "@buildora/shared";
import Logo from "@shared/components/Logo";

interface SettingsTopNavProps {
  user?: User | null;
  onSignOut?: () => void;
}

const SettingsTopNav: React.FC<SettingsTopNavProps> = ({ user, onSignOut }) => {
  const userLabel = user?.name || user?.email || "Guest";
  const avatarUrl = useMemo(() => {
    if (user?.avatarUrl) return user.avatarUrl;
    const seed = user?.email || "guest";
    return `https://i.pravatar.cc/150?u=${encodeURIComponent(seed)}`;
  }, [user?.avatarUrl, user?.email]);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/explore" className="flex items-center gap-2">
            <Logo size="sm" hideText />
            <span className="text-lg font-black text-slate-900">Buildora</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-500 md:flex">
            <Link className="transition hover:text-slate-900" to="/explore">
              Home
            </Link>
            <Link className="transition hover:text-slate-900" to="/hackathons">
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-1">
              <img
                src={avatarUrl}
                alt={userLabel}
                className="h-8 w-8 rounded-full border border-slate-200"
              />
              <span className="max-w-[140px] truncate text-sm font-semibold text-slate-700">
                {userLabel}
              </span>
              <button
                className="hidden text-xs font-semibold text-slate-400 transition hover:text-slate-600 sm:inline"
                onClick={onSignOut}
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/explore"
              className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default SettingsTopNav;
