import React, { useState, useEffect } from "react";
import CrossIcon from "../assets/crossIcon.png";
import CircleIcon from "../assets/circleIcon.png";
import CrossIconGrey from "../assets/crossIconGrey.png";
import { GrPowerReset } from "react-icons/gr";
import GameTieModal from "../components/GameTieModal";
import ResetGameModal from "../components/ResetGameModal";
import WinnersModalComp from "../components/WinnersModalComp";
import winSound from "../sounds/win.wav";
import tieSound from "../sounds/tie.wav";
import clickSound from "../sounds/click.wav";





const GameVsCpu = ({
    playerOneMark,
    playerTwoMark,
}) => {
    const [gameButtons, setGameButtons] = useState(Array(9).fill(" "));
    const [playerTurn, setPlayerTurn] = useState("X");
    const [winner, setWinner] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [showTieModal, setShowTieModal] = useState(false);
    const [isCpuThinking, setIsCpuThinking] = useState(false);
    const [playerXScore, setPlayerXScore] = useState(0);
    const [playerOScore, setPlayerOScore] = useState(0);
    const [ties, setTies] = useState(0);

    const handleResetGame = () => {
        setShowResetModal(!showResetModal);
        new Audio(clickSound).play();
    };

    const handleYesReset = () => {
        setPlayerTurn("X");
        setPlayerXScore(0);
        setPlayerOScore(0);
        setTies(0);
        setGameButtons(Array(9).fill(" "));
        setShowResetModal(false);
        setShowModal(false);
        setShowTieModal(false);
        setWinner(null);
        new Audio(clickSound).play();
    };

    const handleNextRound = () => {
        setGameButtons(Array(9).fill(" "));
        setShowModal(false);
        setShowTieModal(false);
        setPlayerTurn("X");
        setWinner(null);
        new Audio(clickSound).play();
    };

    const checkWinner = (buttons) => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                buttons[a] !== " " &&
                buttons[a] === buttons[b] &&
                buttons[a] === buttons[c]
            ) {
                return buttons[a];
            }
        }
        return null;
    };

    const handleButtonClick = (index) => {
  // ✅ Prevent invalid move
  if (gameButtons[index] !== " " || showModal || showTieModal || isCpuThinking) return;

  const newBoard = [...gameButtons];
  newBoard[index] = playerTurn;
  setGameButtons(newBoard);
  setPlayerTurn(playerTurn === "X" ? "O" : "X");
  new Audio(clickSound).play();
};

// ✅ Check for winner or tie
useEffect(() => {
  const result = checkWinner(gameButtons);
  setWinner(result);

  if (result === "X") {
    setPlayerXScore((prev) => prev + 1);
    setShowModal(true);
    new Audio(winSound).play();
  } else if (result === "O") {
    setPlayerOScore((prev) => prev + 1);
    setShowModal(true);
    new Audio(winSound).play();
  } else if (gameButtons.every((item) => item !== " ") && !result) {
    setTies((prev) => prev + 1);
    setShowTieModal(true);
    new Audio(tieSound).play();
  }
}, [gameButtons]);

// ✅ CPU move logic
useEffect(() => {
  const makeCpuMove = () => {
    const emptyIndexes = gameButtons
      .map((val, idx) => (val === " " ? idx : null))
      .filter((val) => val !== null);

    const tryToWinOrBlock = (symbol) => {
      for (let i of emptyIndexes) {
        const tempBoard = [...gameButtons];
        tempBoard[i] = symbol;
        if (checkWinner(tempBoard) === symbol) {
          return i;
        }
      }
      return null;
    };

    const winMove = tryToWinOrBlock("O");
    if (winMove !== null) return winMove;

    const blockMove = tryToWinOrBlock("X");
    if (blockMove !== null) return blockMove;

    if (emptyIndexes.includes(4)) return 4;

    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => emptyIndexes.includes(i));
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    return emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  };

  // ✅ CPU move only if it's CPU's turn and no modals are active
  if (
    playerTurn === "O" &&
    !showModal &&
    !showTieModal &&
    !showResetModal &&
    winner === null
  ) {
    setIsCpuThinking(true);
    const timer = setTimeout(() => {
      const cpuIndex = makeCpuMove();
      handleButtonClick(cpuIndex);
      setIsCpuThinking(false);
    }, 800);

    return () => clearTimeout(timer);
  }
}, [playerTurn, gameButtons, showModal, showTieModal, showResetModal, winner]);

console.log(playerTurn, winner)

    return (
        <main className="w-full max-w-[375px] mx-auto flex flex-col items-center justify-center">
            {/* Header */}
            <div className="w-full flex items-center justify-between gap-1 px-12">
                <div className="flex">
                    <img src={CrossIcon} alt="Cross Icon" className="w-6 h-6" />
                    <img src={CircleIcon} alt="Circle Icon" className="w-6 h-6" />
                </div>
                <button className="border-none bg-[#1f3641] flex items-center gap-2 cursor-pointer shadow-[0_5px_0_rgba(0,0,0,0.25)] rounded-[10px] w-[150px] h-10 px-3.5">
                    {playerTurn === "X" && <img src={CrossIconGrey} alt="X" className="w-4 h-4" />}
                    {playerTurn === "O" && <img src={CircleIcon} alt="O" className="w-4 h-4" />}
                    <h2 className="text-[#a8bfc9] text-[12px] mx-auto font-bold">
                        {isCpuThinking ? "CPU THINKING..." : "TURN"}
                    </h2>
                </button>
                <button
                    type="button"
                    onClick={handleResetGame}
                    className="border-none bg-[#a8bfc9] w-8 h-8 px-2 rounded-[6px] shadow-[0_5px_0_#4B5563]"
                >
                    <GrPowerReset />
                </button>
            </div>

            {/* Game Board */}
            <div className="grid grid-cols-3 gap-6 p-6">
                {gameButtons.map((val, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => handleButtonClick(idx)}
                        className="bg-gray-700 h-18 rounded-lg w-20 shadow-[0_5px_0_rgba(0,0,0,0.25)] flex items-center justify-center"
                        disabled={isCpuThinking}
                    >
                        {val === "X" && <img src={CrossIcon} alt="X" className="w-4 h-4" />}
                        {val === "O" && <img src={CircleIcon} alt="O" className="w-4 h-4" />}
                    </button>
                ))}
            </div>

            {/* Score Footer */}
            <div className="flex items-center justify-between text-xs text-black gap-2">
                <button className="bg-cyan-500 flex flex-col py-1 rounded-lg font-bold w-20">
                    X (YOU)<span className="text-xl">{playerXScore}</span>
                </button>
                <button className="bg-blue-300 flex flex-col py-1 font-bold rounded-lg w-24">
                    TIES <span className="text-xl">{ties}</span>
                </button>
                <button className="bg-yellow-400 flex flex-col py-1 rounded-lg font-bold w-24">
                    O (CPU) <span className="text-xl">{playerOScore}</span>
                </button>
            </div>

            {/* Modals */}
            {showModal && (
                <WinnersModalComp handleNextRound={handleNextRound} playerTurn={winner} />
            )}
            {showResetModal && (
                <ResetGameModal handleResetGame={handleResetGame} handleYesReset={handleYesReset} />
            )}
            {showTieModal && (
                <GameTieModal handleNextRound={handleNextRound} playerTurn={playerTurn} />
            )}
           
        </main>
    );
};

export default GameVsCpu;