import type { Hackathon, HackathonDetail } from "./types";

const ONLINE_REGEX = /online|remote/i;

export const isOnlineHackathon = (
  hackathon: Hackathon,
  detail?: HackathonDetail
) => {
  const locationMatch = ONLINE_REGEX.test(hackathon.location);
  const modeMatch = detail ? ONLINE_REGEX.test(detail.mode) : false;
  return locationMatch || modeMatch;
};
