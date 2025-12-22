import React, { useEffect, useMemo, useState } from "react";
import Input from "@shared/components/Input";
import type {
  SearchCategory,
  SearchCommand,
  SearchFacet,
  SearchGuidance,
  SearchResult,
  SearchShortcut,
} from "./types";

type SearchCommandCenterProps = {
  title: string;
  statusLabel?: string;
  placeholder?: string;
  autoFocus?: boolean;
  defaultOpen?: boolean;
  variant?: "full" | "compact";
  containerClassName?: string;
  categories: SearchCategory[];
  facets: SearchFacet[];
  commands: SearchCommand[];
  results: SearchResult[];
  shortcuts: SearchShortcut[];
  guidance: SearchGuidance[];
};

const ICONS: Record<SearchCategory["iconKey"], React.ReactNode> = {
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10" />
      <path d="M7 4v5a5 5 0 0 0 10 0V4" />
      <path d="M5 6h2" />
      <path d="M17 6h2" />
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

const SearchCommandCenter: React.FC<SearchCommandCenterProps> = ({
  title,
  statusLabel,
  placeholder = "Search across Buildora",
  autoFocus = false,
  defaultOpen = false,
  variant = "full",
  containerClassName = "",
  categories,
  facets,
  commands,
  results,
  shortcuts,
  guidance,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeCategoryId, setActiveCategoryId] = useState(
    categories[0]?.id ?? ""
  );
  const [activeFacetId, setActiveFacetId] = useState(
    facets.find((facet) => facet.categoryId === categories[0]?.id)?.id ?? ""
  );
  const [activeResultId, setActiveResultId] = useState<string | null>(null);

  const activeCategory = categories.find(
    (category) => category.id === activeCategoryId
  );

  const activeGuidance = guidance.find(
    (item) => item.categoryId === activeCategoryId
  );

  const filteredFacets = useMemo(
    () => facets.filter((facet) => facet.categoryId === activeCategoryId),
    [facets, activeCategoryId]
  );

  const filteredCommands = useMemo(
    () => commands.filter((command) => command.categoryId === activeCategoryId),
    [commands, activeCategoryId]
  );

  const trimmedQuery = query.trim().toLowerCase();

  const filteredResults = useMemo(() => {
    const scopedResults = results.filter(
      (result) => result.categoryId === activeCategoryId
    );
    if (!trimmedQuery) {
      return scopedResults;
    }
    return scopedResults.filter((result) => {
      const haystack = `${result.title} ${result.subtitle}`.toLowerCase();
      return haystack.includes(trimmedQuery);
    });
  }, [results, trimmedQuery, activeCategoryId]);

  const selectionIndex = filteredResults.findIndex(
    (result) => result.id === activeResultId
  );

  useEffect(() => {
    if (!filteredResults.length) {
      setActiveResultId(null);
      return;
    }
    setActiveResultId(filteredResults[0]?.id ?? null);
  }, [activeCategoryId, filteredResults]);

  const handleWrapperBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }
    if (!filteredResults.length) {
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex =
        selectionIndex >= 0
          ? (selectionIndex + 1) % filteredResults.length
          : 0;
      setActiveResultId(filteredResults[nextIndex]?.id ?? null);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex =
        selectionIndex > 0
          ? selectionIndex - 1
          : filteredResults.length - 1;
      setActiveResultId(filteredResults[nextIndex]?.id ?? null);
    }
    if (event.key === "Enter" && activeResultId) {
      event.preventDefault();
    }
  };

  const isCompact = variant === "compact";

  return (
    <div
      className={`rounded-[2.5rem] p-8 border border-white/10 ${
        isCompact ? "bg-[#0c111b] shadow-2xl" : "glass-card"
      } ${containerClassName}`}
      onBlur={handleWrapperBlur}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-black uppercase tracking-widest text-slate-400">
          {title}
        </p>
        {statusLabel ? (
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            {statusLabel}
          </span>
        ) : null}
      </div>
      <div className="pt-6">
        <Input
          placeholder={placeholder}
          autoFocus={autoFocus}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            if (!isOpen) {
              setIsOpen(true);
            }
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          leftElement={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          }
        />
      </div>

      {isOpen && !isCompact ? (
        <div className="mt-6 rounded-[2rem] border border-white/10 bg-[#0b0f17]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
            <div className="lg:col-span-4 space-y-3">
              {categories.map((category) => {
                const isActive = category.id === activeCategoryId;
                return (
                  <button
                    key={category.id}
                    className={`w-full flex items-center justify-between gap-3 rounded-2xl px-4 py-3 border transition-all ${
                      isActive
                        ? "bg-white/10 border-white/20 text-white"
                        : "bg-white/5 border-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                    }`}
                    onClick={() => {
                      setActiveCategoryId(category.id);
                      const firstFacet = facets.find(
                        (facet) => facet.categoryId === category.id
                      );
                      setActiveFacetId(firstFacet?.id ?? "");
                      setActiveResultId(null);
                    }}
                    type="button"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div
                        className={`h-10 w-10 rounded-xl flex items-center justify-center ${category.accentClass}`}
                      >
                        <div className="h-5 w-5">{ICONS[category.iconKey]}</div>
                      </div>
                      <div>
                        <p className="text-sm font-bold">{category.label}</p>
                        <p className="text-xs text-slate-500">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <svg
                      className="h-4 w-4 text-slate-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-4 space-y-3">
              {filteredFacets.map((facet) => {
                const isActive = facet.id === activeFacetId;
                return (
                  <button
                    key={facet.id}
                    className={`w-full flex items-center justify-between gap-3 rounded-2xl px-4 py-3 border transition-all ${
                      isActive
                        ? "bg-indigo-500/80 border-indigo-300 text-white"
                        : "bg-white/5 border-white/5 text-slate-300 hover:border-indigo-400/40 hover:text-white"
                    }`}
                    onClick={() => setActiveFacetId(facet.id)}
                    type="button"
                  >
                    <div className="text-left">
                      <p className="text-sm font-bold">{facet.label}</p>
                      <p className="text-xs text-slate-400">
                        {facet.description}
                      </p>
                    </div>
                    <svg
                      className="h-4 w-4 text-slate-200"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Search tips
                </p>
                <p className="text-sm font-bold text-white mt-2">
                  {activeGuidance?.title ?? "Search Buildora"}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  {activeGuidance?.description ??
                    "Type in the field above to discover anything."}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Quick commands
                </p>
                {filteredCommands.map((command) => (
                  <div
                    key={command.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {command.label}
                      </p>
                      <p className="text-xs text-slate-500">
                        {command.description}
                      </p>
                    </div>
                    {command.urlLabel ? (
                      <span className="text-[10px] font-semibold text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                        {command.urlLabel}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 px-6 py-4">
            <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
              {shortcuts.map((shortcut) => (
                <div
                  key={shortcut.id}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1"
                >
                  <span>{shortcut.label}</span>
                  <span className="text-slate-300">
                    {shortcut.keys.join(" + ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {isOpen && isCompact ? (
        <div className="mt-5 rounded-2xl border border-white/10 bg-[#0b0f17] p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = category.id === activeCategoryId;
              return (
                <button
                  key={category.id}
                  className={`rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition ${
                    isActive
                      ? "bg-indigo-500/30 border-indigo-400/60 text-white"
                      : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                  }`}
                  onClick={() => setActiveCategoryId(category.id)}
                  type="button"
                >
                  {category.label}
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">
              Results
            </p>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
              {trimmedQuery.length > 0 ? filteredResults.length : 0} matches
            </span>
          </div>
          <div className="mt-3 space-y-2 max-h-[45vh] overflow-y-auto pr-1">
            {trimmedQuery.length > 0
              ? filteredResults.map((result, index) => {
              const isActive = result.id === activeResultId;
              return (
                <button
                  key={result.id}
                  className={`w-full flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition ${
                    isActive
                      ? "bg-indigo-500/30 border-indigo-400/60 text-white"
                      : "bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:text-white"
                  }`}
                  onMouseEnter={() => setActiveResultId(result.id)}
                  type="button"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{result.title}</p>
                      {result.badge ? (
                        <span className="text-[9px] font-black uppercase tracking-widest text-indigo-200 bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                          {result.badge}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-slate-500">{result.subtitle}</p>
                  </div>
                  {result.urlLabel ? (
                    <span className="text-[10px] font-semibold text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      {result.urlLabel}
                    </span>
                  ) : null}
                </button>
              );
            })
              : null}
            {trimmedQuery.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-400">
                Start typing to see demo results.
              </div>
            ) : null}
            {trimmedQuery.length > 0 && !filteredResults.length ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-400">
                No demo matches yet.
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {isOpen && !isCompact && (query.trim().length > 0 || filteredResults.length > 0) ? (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">
              Results
            </p>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
              {filteredResults.length} matches
            </span>
          </div>
          <div className="space-y-2">
            {filteredResults.map((result, index) => {
              const isActive = result.id === activeResultId;
              return (
                <button
                  key={result.id}
                  className={`w-full flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition ${
                    isActive
                      ? "bg-indigo-500/30 border-indigo-400/60 text-white"
                      : "bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:text-white"
                  }`}
                  onMouseEnter={() => setActiveResultId(result.id)}
                  type="button"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{result.title}</p>
                      {result.badge ? (
                        <span className="text-[9px] font-black uppercase tracking-widest text-indigo-200 bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                          {result.badge}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-slate-500">{result.subtitle}</p>
                  </div>
                  <div className="text-right">
                    {result.urlLabel ? (
                      <span className="text-[10px] font-semibold text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                        {result.urlLabel}
                      </span>
                    ) : null}
                    {index === 0 ? (
                      <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-400">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                          Enter
                        </span>
                        <span>to open</span>
                      </div>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button className="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-300 border border-white/10 bg-white/5">
              Reset filters
            </button>
            <button className="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
              Show {filteredResults.length} results
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchCommandCenter;
