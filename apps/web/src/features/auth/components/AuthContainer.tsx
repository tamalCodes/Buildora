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

          <div className="flex-1 flex items-start lg:items-center justify-center px-6 lg:px-10 pt-8 lg:pt-0">
            <div className="w-full max-w-105">{children}</div>
          </div>

          <div className="lg:hidden px-6 pb-8 pt-6">
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { value: "12k+", label: "Builders" },
                { value: "850+", label: "Hackathons" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-(--border-subtle) bg-(--bg-input) px-3 py-2.5 text-center"
                >
                  <p className="font-geist text-lg font-black tracking-tight text-(--text-heading)">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-(--text-tertiary)">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hidden lg:flex w-full lg:w-[58%] bg-(--auth-hero-bg) text-(--auth-hero-text) relative overflow-hidden px-8 lg:px-16 py-10 lg:py-12 items-center justify-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -left-40 -top-20 h-130 w-130 rounded-full bg-(--auth-hero-ring-indigo) blur-3xl" />
            <div className="absolute -right-40 -bottom-30 h-115 w-115 rounded-full bg-(--auth-hero-ring-cyan) blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.4]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--auth-hero-line) 1px, transparent 1px), linear-gradient(90deg, var(--auth-hero-line) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                maskImage:
                  "radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 80%)",
              }}
            />
          </div>

          <div className="relative z-10 w-full max-w-160">
            <div className="inline-flex items-center gap-2 rounded-full border border-(--auth-hero-quote) bg-white/5 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-(--auth-hero-muted)">
                Trusted by builders worldwide
              </span>
            </div>

            <div className="mt-8 rounded-3xl border border-(--auth-hero-quote) bg-white/5 p-7 lg:p-9 backdrop-blur-xl shadow-2xl shadow-black/5">
              <svg
                className="h-9 w-9 text-(--auth-hero-quote)"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9.5 4C6 4 3 7 3 10.5V20h8v-9H6.8c.2-2.3 1.6-3.7 3.7-4L9.5 4Zm11 0c-3.5 0-6.5 3-6.5 6.5V20h8v-9h-4.2c.2-2.3 1.6-3.7 3.7-4L20.5 4Z" />
              </svg>
              <blockquote className="mt-4 text-[1.7rem] lg:text-[2.1rem] leading-[1.25] tracking-[-0.015em] font-geist font-semibold text-(--auth-hero-text)">
                {activeTweet.text}
              </blockquote>
              <div className="mt-7 flex items-center gap-4">
                <div className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 ring-2 ring-white/10" />
                <div>
                  <p className="text-sm font-bold text-(--auth-hero-text)">
                    {activeTweet.handle}
                  </p>
                  <p className="text-xs text-(--auth-hero-muted)">
                    {activeTweet.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "12k+", label: "Builders" },
                { value: "850+", label: "Hackathons" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-(--auth-hero-quote) bg-white/5 px-4 py-4 backdrop-blur-sm"
                >
                  <p className="font-geist text-2xl font-black tracking-tight text-(--auth-hero-text)">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-(--auth-hero-muted)">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthContainer;
