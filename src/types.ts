export type TeamName =
  | "BENGAL_WARRIORS"
  | "DABANG_DELHI"
  | "U_MUMBA"
  | "BENGALURU_BULLS"
  | "GUJARAT_FORTUNEGIANTS"
  | "HARYANA_STEELERS"
  | "JAIPUR_PINK_PANTHERS"
  | "PATNA_PIRATES"
  | "PUNERI_PALTAN"
  | "TELUGU_TITANS"
  | "TAMIL_THAIWAS"
  | "UP_YODDHA";

export type Role = "RAIDER" | "DEFENDER" | "ALL_ROUNDER";

export type TeamMapping = {
  [key in TeamName]?: Team;
};

export interface MatchState {
  teams: TeamMapping;
  matchTime: string;
}

export interface Player {
  name: string;
  role: Role;
  no: number;
}

export interface Team {
  name: TeamName;
  players: Player[];
  subs: Player[];
  score: number;
}
