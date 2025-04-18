import { useGameStore } from "@/store/gameStore";
import React, { useState } from "react";

interface GuessInputProps {
  placeholder: string;
  onCorrectGuess: () => void;
  onIncorrectGuess: (guess: string) => void;
}

export const GuessInput: React.FC<GuessInputProps> = ({
  placeholder,
  onCorrectGuess,
  onIncorrectGuess,
}) => {
  const [guess, setGuess] = useState("");
  const makeGuess = useGameStore((state) => state.makeGuess);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guess.trim()) return;

    const isCorrect = makeGuess(guess);

    if (isCorrect) {
      onCorrectGuess();
    } else {
      onIncorrectGuess(guess);
    }

    setGuess("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Guess
        </button>
      </div>
    </form>
  );
};
