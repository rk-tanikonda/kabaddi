"use client";

import { FC, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Player, TeamName } from "@/types";
import useMatchStore from "@/store";

interface PlayerCardProps {
  player: Player;
  isSub: boolean;
  index: number;
}

const PlayerCard: FC<PlayerCardProps> = ({ player, isSub, index }) => {
  const idPrefix = isSub ? "sub" : "player";

  return (
    <Draggable draggableId={`${idPrefix}-${index}`} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 bg-gray-900 rounded-lg flex items-center justify-between text-white border-l-4 ${
            !isSub ? "border-lime-400" : "border-indigo-400"
          }`}
        >
          <span>
            {player.name} - {player.role}
          </span>
          <span className="ml-4 text-sm">Jersey No: {player.no}</span>
        </li>
      )}
    </Draggable>
  );
};

const TeamReview = () => {
  const { teams, swapPlayerWithSub } = useMatchStore();
  const teamNames = Object.keys(teams) as TeamName[];
  const [selectedTeam, setSelectedTeam] = useState<TeamName>(teamNames[0]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // If dragging within the same list, do nothing
    if (source.droppableId === destination.droppableId) return;

    const isSourceSub = source.droppableId === "subs";
    const isDestinationSub = destination.droppableId === "subs";

    swapPlayerWithSub(
      selectedTeam,
      isSourceSub ? destination.index : source.index,
      isSourceSub ? source.index : destination.index
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-lime-400 tracking-wide">
          Team Review
        </h1>
      </header>

      <div className="flex justify-center mb-8">
        {teamNames.map((teamName) => (
          <button
            key={teamName}
            className={`px-6 py-3 mx-2 font-semibold rounded-full transition-colors duration-300 ${
              selectedTeam === teamName
                ? "bg-lime-400 text-gray-900 shadow-lg"
                : "bg-gray-700 text-lime-400 hover:bg-lime-500 hover:text-gray-900"
            }`}
            onClick={() => setSelectedTeam(teamName)}
          >
            {teamName.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
        {teams[selectedTeam] ? (
          <>
            <h2 className="text-3xl font-bold text-lime-400 mb-6">
              {selectedTeam.replace("_", " ")}
            </h2>
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Droppable droppableId="players">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      <h3 className="text-2xl font-semibold text-indigo-400 mb-4">
                        Playing 7
                      </h3>
                      {teams[selectedTeam].players.map((player, index) => (
                        <PlayerCard
                          key={`player-${index}`}
                          index={index}
                          player={player}
                          isSub={false}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                <Droppable droppableId="subs">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      <h3 className="text-2xl font-semibold text-indigo-400 mb-4">
                        Substitutes
                      </h3>
                      {teams[selectedTeam].subs.map((sub, index) => (
                        <PlayerCard
                          key={`sub-${index}`}
                          index={index}
                          player={sub}
                          isSub={true}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </DragDropContext>
          </>
        ) : (
          <p className="text-center text-white text-lg">
            No team data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamReview;
