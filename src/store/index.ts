import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MatchState, TeamName, Team, Player } from "@/types";

// Initial state without predefined teams
const initialState: MatchState = {
  teams: {},
  matchTime: "",
  scores: {},
};

// Create the store with persistence
const useMatchStore = create(
  persist<
    MatchState & {
      setMatchTime: (time: string) => void;
      setTeam: (teamName: TeamName, team: Team) => void;
      updateTeamScore: (teamName: TeamName, score: number) => void;
      addPlayerToTeam: (teamName: TeamName, player: Player) => void;
      addSubToTeam: (teamName: TeamName, player: Player) => void;
      swapPlayerWithSub: (
        teamName: TeamName,
        playerIndex: number,
        subIndex: number
      ) => void;
    }
  >(
    (set) => ({
      ...initialState,

      setMatchTime: (time) => set({ matchTime: time }),
      setTeam: (teamName, team) =>
        set((state) => ({
          teams: {
            ...state.teams,
            [teamName]: team,
          },
        })),

      updateTeamScore: (teamName, score) =>
        set((state) => ({
          scores: {
            ...state.scores,
            [teamName]: score,
          },
        })),

      addPlayerToTeam: (teamName, player) =>
        set((state) => ({
          teams: {
            ...state.teams,
            [teamName]: {
              ...state.teams[teamName],
              players: [...(state.teams[teamName]?.players || []), player],
            },
          },
        })),

      addSubToTeam: (teamName, player) =>
        set((state) => ({
          teams: {
            ...state.teams,
            [teamName]: {
              ...state.teams[teamName],
              subs: [...(state.teams[teamName]?.subs || []), player],
            },
          },
        })),

      swapPlayerWithSub: (teamName, playerIndex, subIndex) =>
        set((state) => {
          const team = state.teams[teamName];
          if (!team) return state; // Return state unchanged if team is undefined

          const players = [...team.players];
          const subs = [...team.subs];

          // Swap the player with the sub
          [players[playerIndex], subs[subIndex]] = [
            subs[subIndex],
            players[playerIndex],
          ];

          return {
            teams: {
              ...state.teams,
              [teamName]: {
                ...team,
                players,
                subs,
              },
            },
          };
        }),
    }),
    {
      name: "match-store",
      getStorage: () => localStorage,
    }
  )
);

export default useMatchStore;
