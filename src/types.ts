export type TeamName =
  | "Bengal Warriors"
  | "Dabang Delhi"
  | "U Mumba"
  | "Bengaluru Bulls"
  | "Gujarat Fortunegiants"
  | "Haryana Steelers"
  | "Jaipur Pink Panthers"
  | "Patna Pirates"
  | "Puneri Paltan"
  | "Telugu Titans"
  | "Tamil Thaiwas"
  | "UP Yoddha";

export type Role = "Raider" | "Defender" | "All-Rounder";

export type TeamMapping = {
  [key in TeamName]?: Team;
};

export interface MatchState {
  teams: TeamMapping;
  matchTime: string;
  scores: {
    [key in TeamName]?: number;
  };
}

export interface Player {
  name: string;
  role: Role;
  no: number;
  position?: string;
}

export interface Team {
  name: TeamName;
  players: Player[];
  subs: Player[];
}
