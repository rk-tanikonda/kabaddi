import { TeamName, Team } from "@/types";
import { TEAMS } from "@/constants";
import useMatchStore from "@/store";

export const getTeamsNames = () => {
  return Array.from(Object.keys(TEAMS)) as unknown as TeamName[];
};

export const getTeamPlayers = () => {};

export const setTeamsOnStart = (
  teamA: Team,
  teamB: Team,
  matchTime: string
) => {
  const { setTeam, setMatchTime } = useMatchStore.getState();

  setTeam(teamA.name, teamA);
  setTeam(teamB.name, teamB);
  setMatchTime(matchTime);
};
