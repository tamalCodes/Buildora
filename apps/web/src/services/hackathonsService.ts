import {
  FEATURED_HACKATHONS,
  OPEN_HACKATHONS,
  PAST_HACKATHONS,
  UPCOMING_HACKATHONS,
} from "@/features/hackathons/constants/constants";
import type {
  Hackathon,
  HackathonsCatalog,
} from "@/features/hackathons/constants/types";
import { apiRequest } from "./apiClient";

type HackathonStatus = Hackathon["status"];

type HackathonsCatalogApiShape = {
  featuredHackathons?: unknown;
  openHackathons?: unknown;
  upcomingHackathons?: unknown;
  pastHackathons?: unknown;
  featured?: unknown;
  open?: unknown;
  upcoming?: unknown;
  past?: unknown;
  hackathons?: unknown;
  items?: unknown;
};

const HACKATHON_STATUS_VALUES: HackathonStatus[] = ["Open", "Upcoming", "Past"];

const DEFAULT_COVER_URL =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2400&auto=format&fit=crop";

const FALLBACK_CATALOG: HackathonsCatalog = {
  featuredHackathons: FEATURED_HACKATHONS,
  openHackathons: OPEN_HACKATHONS,
  upcomingHackathons: UPCOMING_HACKATHONS,
  pastHackathons: PAST_HACKATHONS,
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isHackathonStatus = (value: unknown): value is HackathonStatus =>
  typeof value === "string" &&
  HACKATHON_STATUS_VALUES.includes(value as HackathonStatus);

const readString = (value: unknown, fallback = ""): string =>
  typeof value === "string" && value.trim().length > 0 ? value : fallback;

const readOptionalString = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim().length > 0 ? value : undefined;

const readStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
};

const normalizeHackathon = (
  value: unknown,
  fallbackStatus: HackathonStatus = "Upcoming"
): Hackathon | null => {
  if (!isObject(value)) {
    return null;
  }

  const id = readString(value.id);
  const title = readString(value.title);

  if (!id || !title) {
    return null;
  }

  const status = isHackathonStatus(value.status) ? value.status : fallbackStatus;

  return {
    id,
    title,
    organizer: readString(value.organizer, "Buildora"),
    location: readString(value.location, "TBD"),
    dates: readString(value.dates, "Dates to be announced"),
    status,
    tags: readStringArray(value.tags),
    prize: readString(value.prize, "Prize details soon"),
    participants: readString(value.participants, "Participants update soon"),
    coverUrl: readString(value.coverUrl, DEFAULT_COVER_URL),
    logoUrl: readString(value.logoUrl, `https://api.dicebear.com/7.x/identicon/svg?seed=${id}`),
    sponsor: readOptionalString(value.sponsor),
  };
};

const normalizeHackathonArray = (
  value: unknown,
  fallbackStatus: HackathonStatus = "Upcoming"
): Hackathon[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => normalizeHackathon(item, fallbackStatus))
    .filter((item): item is Hackathon => Boolean(item));
};

const splitByStatus = (hackathons: Hackathon[]) => ({
  openHackathons: hackathons.filter((item) => item.status === "Open"),
  upcomingHackathons: hackathons.filter((item) => item.status === "Upcoming"),
  pastHackathons: hackathons.filter((item) => item.status === "Past"),
});

const normalizeCatalogFromList = (hackathons: Hackathon[]): HackathonsCatalog => {
  const buckets = splitByStatus(hackathons);

  return {
    featuredHackathons: buckets.openHackathons.slice(0, 2),
    openHackathons: buckets.openHackathons,
    upcomingHackathons: buckets.upcomingHackathons,
    pastHackathons: buckets.pastHackathons,
  };
};

const normalizeCatalogFromObject = (
  payload: HackathonsCatalogApiShape
): HackathonsCatalog | null => {
  const hasCategorizedCollections =
    "featuredHackathons" in payload ||
    "openHackathons" in payload ||
    "upcomingHackathons" in payload ||
    "pastHackathons" in payload ||
    "featured" in payload ||
    "open" in payload ||
    "upcoming" in payload ||
    "past" in payload;

  if (hasCategorizedCollections) {
    return {
      featuredHackathons: normalizeHackathonArray(
        payload.featuredHackathons ?? payload.featured,
        "Open"
      ),
      openHackathons: normalizeHackathonArray(
        payload.openHackathons ?? payload.open,
        "Open"
      ),
      upcomingHackathons: normalizeHackathonArray(
        payload.upcomingHackathons ?? payload.upcoming,
        "Upcoming"
      ),
      pastHackathons: normalizeHackathonArray(
        payload.pastHackathons ?? payload.past,
        "Past"
      ),
    };
  }

  const flatHackathons = normalizeHackathonArray(
    payload.hackathons ?? payload.items
  );
  const hasFlatCollection = "hackathons" in payload || "items" in payload;

  if (hasFlatCollection) {
    return normalizeCatalogFromList(flatHackathons);
  }

  if (!flatHackathons.length) {
    return null;
  }

  return normalizeCatalogFromList(flatHackathons);
};

export class HackathonsService {
  static async getCatalog(): Promise<HackathonsCatalog> {
    const response = await apiRequest<unknown>("/hackathons", {
      withAuth: false,
    });

    if (!response.success || !response.data) {
      return FALLBACK_CATALOG;
    }

    if (Array.isArray(response.data)) {
      const hackathons = normalizeHackathonArray(response.data);
      return normalizeCatalogFromList(hackathons);
    }

    if (isObject(response.data)) {
      const normalized = normalizeCatalogFromObject(
        response.data as HackathonsCatalogApiShape
      );
      if (normalized) {
        return normalized;
      }
    }

    return FALLBACK_CATALOG;
  }
}
