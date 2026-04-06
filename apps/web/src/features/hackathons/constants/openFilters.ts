import type {
  Hackathon,
  HackathonsOpenFilterId,
} from "@/features/hackathons/constants/types";

const INVALID_TIMESTAMP = Number.MAX_SAFE_INTEGER;
const THOUSAND = 1_000;
const MILLION = 1_000_000;

const parseHackathonEndDateTimestamp = (dates: string): number => {
  const dateSegments = dates.split("-");
  const endDateLabel = dateSegments[dateSegments.length - 1]?.trim();

  if (!endDateLabel) {
    return INVALID_TIMESTAMP;
  }

  const parsedTimestamp = Date.parse(endDateLabel);

  return Number.isNaN(parsedTimestamp) ? INVALID_TIMESTAMP : parsedTimestamp;
};

const parseHackathonPrizeAmount = (prize: string): number => {
  const normalizedPrize = prize.replaceAll(",", "");
  const match = normalizedPrize.match(/(\d+(?:\.\d+)?)\s*([kKmM]?)/);

  if (!match) {
    return 0;
  }

  const rawAmount = Number(match[1]);

  if (Number.isNaN(rawAmount)) {
    return 0;
  }

  const unit = match[2]?.toLowerCase();
  if (unit === "m") {
    return rawAmount * MILLION;
  }

  if (unit === "k") {
    return rawAmount * THOUSAND;
  }

  return rawAmount;
};

export const applyOpenHackathonsFilter = (
  hackathons: Hackathon[],
  filterId: HackathonsOpenFilterId
): Hackathon[] => {
  const openHackathons = hackathons.filter((hackathon) => hackathon.status === "Open");

  if (filterId === "ending-soon") {
    return [...openHackathons].sort(
      (left, right) =>
        parseHackathonEndDateTimestamp(left.dates) -
        parseHackathonEndDateTimestamp(right.dates)
    );
  }

  if (filterId === "highest-prize") {
    return [...openHackathons].sort(
      (left, right) =>
        parseHackathonPrizeAmount(right.prize) -
        parseHackathonPrizeAmount(left.prize)
    );
  }

  return openHackathons;
};
