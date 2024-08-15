import create from "zustand";
import { persist } from "zustand/middleware";
import { MatchState, TeamName, Team, Player } from "@/types";

// Initial state without predefined teams
const initialState: MatchState = {
  teams: {},
  matchTime: "",
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
        set((state) => {
          const team = state.teams[teamName];
          if (!team) return state; // Return state unchanged if team is undefined
          return {
            teams: {
              ...state.teams,
              [teamName]: {
                ...team,
                score,
              },
            },
          };
        }),

      addPlayerToTeam: (teamName, player) =>
        set((state) => {
          const team = state.teams[teamName];
          if (!team) return state; // Return state unchanged if team is undefined
          return {
            teams: {
              ...state.teams,
              [teamName]: {
                ...team,
                players: [...team.players, player],
              },
            },
          };
        }),

      addSubToTeam: (teamName, player) =>
        set((state) => {
          const team = state.teams[teamName];
          if (!team) return state; // Return state unchanged if team is undefined
          return {
            teams: {
              ...state.teams,
              [teamName]: {
                ...team,
                subs: [...team.subs, player],
              },
            },
          };
        }),

      swapPlayerWithSub: (teamName, playerIndex, subIndex) =>
        set((state) => {
          const team = state.teams[teamName];
          if (!team) return state; // Return state unchanged if team is undefined
          const players = [...team.players];
          const subs = [...team.subs];
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
      name: "match-store", // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export default useMatchStore;
