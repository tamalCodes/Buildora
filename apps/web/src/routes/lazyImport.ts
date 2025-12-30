import React from "react";

/**
 * lazyImport wraps React.lazy with a small retry for common chunk-load failures.
 * This keeps route-level code splitting resilient to transient network hiccups.
 */

type ImportFactory<T> = () => Promise<{ default: T }>;

const isChunkLoadError = (error: unknown) => {
  if (!(error instanceof Error)) {
    return false;
  }
  const message = error.message || "";
  return (
    message.includes("Loading chunk") ||
    message.includes("ChunkLoadError") ||
    message.includes("dynamic import")
  );
};

export const lazyImport = <T extends React.ComponentType<any>>(
  factory: ImportFactory<T>,
  retryDelayMs = 300
) =>
  React.lazy(async () => {
    try {
      return await factory();
    } catch (error) {
      if (!isChunkLoadError(error)) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
      return factory();
    }
  });
