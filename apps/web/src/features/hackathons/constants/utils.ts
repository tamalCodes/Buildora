import type { Hackathon, HackathonDetail } from "./types";

const ONLINE_REGEX = /online|remote/i;
const PRIZE_AMOUNT_REGEX = /\$[\d,.]+(?:\s*[kKmM])?/;

export const isOnlineHackathon = (
  hackathon: Hackathon,
  detail?: HackathonDetail
) => {
  const locationMatch = ONLINE_REGEX.test(hackathon.location);
  const modeMatch = detail ? ONLINE_REGEX.test(detail.mode) : false;
  return locationMatch || modeMatch;
};

export const getPrizePoolDisplay = (
  prizePool: string
): { amount: string; label: string } => {
  const amountMatch = prizePool.match(PRIZE_AMOUNT_REGEX);
  const amount = amountMatch?.[0]?.trim() ?? prizePool.trim();

  if (!amountMatch) {
    return {
      amount,
      label: "",
    };
  }

  return {
    amount,
    label: "prizes",
  };
};
