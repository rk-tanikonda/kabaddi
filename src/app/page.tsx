"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { TeamName } from "@/types";
import { TEAMS } from "@/constants";
import { getTeamsNames, setTeamsOnStart } from "@/utils";

export default function Home() {
  const [teamA, setTeamA] = useState<TeamName>("Bengaluru Bulls");
  const [teamB, setTeamB] = useState<TeamName>("Bengal Warriors");
  const teamsNames = getTeamsNames();
  const teams = TEAMS;
  const [matchDate, setMatchDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const router = useRouter();

  const handleStartMatch = () => {
    setTeamsOnStart(teams[teamA], teams[teamB], matchDate);
    router.push("/team-review");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      {/* Header */}
      <header className="mb-8 text-center">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-scroll">
            <h1
              className="inline-block text-3xl font-extrabold text-lime-400 tracking-wide"
              title={teamA}
            >
              {teamA}
            </h1>
            <p className="inline-block text-2xl font-semibold text-indigo-400 mx-4">
              vs
            </p>
            <h1
              className="inline-block text-3xl font-extrabold text-lime-400 tracking-wide"
              title={teamB}
            >
              {teamB}
            </h1>
          </div>
        </div>
      </header>

      {/* Team Selection */}
      <div className="w-full max-w-lg p-8 bg-gray-800 bg-opacity-70 rounded-xl shadow-2xl mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-lime-400 mb-2">
              Team A
            </label>
            <select
              value={teamA}
              onChange={(e) => setTeamA(e.target.value as TeamName)}
              className="p-3 border rounded-md bg-gray-900 text-gray-300 focus:border-lime-400 focus:ring-lime-400"
            >
              <option value="" disabled>
                Select Team A
              </option>
              {teamsNames.map((teamName) => (
                <option key={teamName} value={teamName} title={teamName}>
                  {teamName.length > 20
                    ? `${teamName.slice(0, 20)}...`
                    : teamName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-lime-400 mb-2">
              Team B
            </label>
            <select
              value={teamB}
              onChange={(e) => setTeamB(e.target.value as TeamName)}
              className="p-3 border rounded-md bg-gray-900 text-gray-300 focus:border-lime-400 focus:ring-lime-400"
            >
              <option value="" disabled>
                Select Team B
              </option>
              {teamsNames.map((teamName) => (
                <option key={teamName} value={teamName} title={teamName}>
                  {teamName.length > 20
                    ? `${teamName.slice(0, 20)}...`
                    : teamName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <label className="text-sm font-semibold text-lime-400 mb-2">
            Match Date
          </label>
          <input
            type="date"
            value={matchDate}
            onChange={(e) => setMatchDate(e.target.value)}
            className="p-3 border rounded-md bg-gray-900 text-gray-300 focus:border-lime-400 focus:ring-lime-400"
          />
        </div>
        <button
          onClick={handleStartMatch}
          className="mt-8 w-full bg-indigo-500 text-white py-3 px-6 rounded-md shadow-lg hover:bg-indigo-600 transition-transform transform hover:scale-105 duration-300"
        >
          Start Match
        </button>
      </div>
    </div>
  );
}
