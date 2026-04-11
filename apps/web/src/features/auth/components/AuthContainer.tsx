import type { AuthContainerProps } from "@/features/auth/constants/interfaces";
import React, { useEffect, useState } from "react";

type DemoTweet = {
  id: string;
  handle: string;
  role: string;
  text: string;
};

const TWEET_INDEX_KEY = "buildora-auth-tweet-index";

const FALLBACK_TWEET: DemoTweet = {
  id: "fallback",
  handle: "@buildora",
  role: "Product Team",
  text: "Buildora helps communities run large-scale hackathons with calm, reliable, developer-first infrastructure.",
};

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  const [activeTweet, setActiveTweet] = useState<DemoTweet>(FALLBACK_TWEET);

  useEffect(() => {
    let isCancelled = false;

    const loadTweet = async () => {
      try {
        const response = await fetch("/demoTweets.json");
        if (!response.ok) {
          return;
        }

        const tweets = (await response.json()) as DemoTweet[];
        if (!Array.isArray(tweets) || tweets.length === 0) {
          return;
        }

        const previousRaw = sessionStorage.getItem(TWEET_INDEX_KEY);
        const previousIndex = Number.parseInt(previousRaw ?? "-1", 10);
        const nextIndex = Number.isNaN(previousIndex)
          ? 0
          : (previousIndex + 1) % tweets.length;

        sessionStorage.setItem(TWEET_INDEX_KEY, String(nextIndex));
        if (!isCancelled) {
          setActiveTweet(tweets[nextIndex]);
        }
      } catch {
        // Keep fallback tweet on any network/parse failure.
      }
    };

    void loadTweet();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-(--bg-elevated) text-(--text-primary)">
      <div className="min-h-screen w-full flex flex-col lg:flex-row">
        <section className="w-full lg:w-[42%] border-r-0 lg:border-r border-(--border-subtle) bg-white dark:bg-(--bg-page) flex flex-col min-h-screen lg:min-h-0">
          <header className="px-6 lg:px-10 pt-7 pb-4 lg:py-6">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-8 h-8 rounded-lg border border-(--border-default) bg-(--bg-input) flex items-center justify-center">
                <div className="w-3.5 h-3.5 border-2 border-indigo-400 rounded-md" />
              </div>
              <span className="font-geist font-black text-2xl tracking-tight text-(--text-heading)">
                Buildora
              </span>
            </div>
          </header>

          <div className="flex-1 flex items-center justify-center px-6 lg:px-10">
            <div className="w-full max-w-105">{children}</div>
          </div>

          <div className="lg:hidden px-6 pb-8 pt-4">
            <div className="mx-auto w-fit flex items-center gap-2 opacity-70">
              <div className="w-6 h-6 rounded-md border border-(--border-default) bg-(--bg-input) flex items-center justify-center">
                <div className="w-2.5 h-2.5 border-2 border-indigo-400 rounded-sm" />
              </div>
              <span className="font-geist font-bold text-2xl tracking-tight text-(--text-heading)">
                Buildora
              </span>
            </div>
          </div>
        </section>

        <section className="hidden lg:flex w-full lg:w-[58%] bg-(--auth-hero-bg) text-(--auth-hero-text) relative overflow-hidden px-8 lg:px-16 py-10 lg:py-12 items-center justify-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -left-40 top-10 h-130 w-130 rounded-full border-[40px] border-(--auth-hero-ring-indigo)" />
            <div className="absolute -right-45 -bottom-30 h-115 w-115 rounded-full border-[36px] border-(--auth-hero-ring-cyan)" />
            <div className="absolute left-1/3 top-1/2 h-px w-40 bg-gradient-to-r from-transparent via-(--auth-hero-line) to-transparent" />
          </div>

          <div className="relative z-10 max-w-175">
            <div className="flex items-start gap-3">
              <span className="text-5xl leading-none text-(--auth-hero-quote) select-none translate-y-1">
                &ldquo;
              </span>
              <blockquote className="text-[1.9rem] lg:text-[2.35rem] leading-[1.22] tracking-[-0.01em] font-geist font-semibold text-(--auth-hero-text)">
                {activeTweet.text}
              </blockquote>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400" />
              <div>
                <p className="text-sm font-bold text-(--auth-hero-text)">
                  {activeTweet.handle}
                </p>
                <p className="text-xs text-(--auth-hero-muted)">{activeTweet.role}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthContainer;
