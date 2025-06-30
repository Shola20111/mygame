import React, { useState } from "react";
import CrossIcon from "../assets/crossIcon.png";
import CircleIcon from "../assets/circleIcon.png";
import CrossIconGrey from "../assets/crossIconGrey.png";
import CircleIconGrey from "../assets/circleIconGrey.png";
import ButtonComp from "../components/ButtonComp";
import { Link } from "react-router-dom";

const SelectPlayerPage = ({
  playerOneMark,
  setPlayerOneMark,
  playerTwoMark,
  setPlayerTwoMark,
  setNewgame
}) => {

  return (
    <main
      className="w-full max-w-[375px] h-auto mx-auto flex flex-col items-center
    justify-center gap-[50px]"
    >
      <div className="flex items-center justify-center gap-1">
        <img src={CrossIcon} alt="Cross Icon" />
        <img src={CircleIcon} alt="Circle Icon" />
      </div>
      <section
        className="bg-[#1F3641] rounded-[15px] h-auto flex flex-col items-center gap-2 p-[10px]"
        style={{
          boxShadow: "0 5px rgba(0, 0, 0, 0.5)",
        }}
      >
        <h2 className="text-[#a8bfc9] text-[1.5rem] font-bold">
          PICK PLAYER'1 MARK
        </h2>
        <div className="bg-[#1a2a33] p-[10px] flex items-center justify-between rounded-[15px] w-full">
          <button
            type="button"
            onClick={() => setPlayerOneMark("x")}
            className={`w-[45%] p-[10px] ${
              playerOneMark == "x" ? "bg-[#a8bfc9]" : "bg-none"
            } border-none flex items-center justify-center cursor-pointer hover:bg-[#1f3641] hover:shadow-[0_5px_0_rgba(0,0,0,0.25)] rounded-[10px]`}
          >
            <img src={CrossIconGrey} alt="CrossIcongrey" />
          </button>
          <button
            type="button"
            onClick={() => setPlayerOneMark("o")}
            className={`w-[45%] p-[10px] ${
              playerOneMark == "o" ? "bg-[#a8bfc9]" : "bg-none"
            } border-none flex items-center justify-center cursor-pointer hover:bg-[#1f3641] hover:shadow-[0_5px_0_rgba(0,0,0,0.25)] rounded-[10px]`}
          >
            <img src={CircleIconGrey} alt="CircleIcongrey" />
          </button>
        </div>
        <h3 className="text-[#a8bfc9] text-base font-semibold">
          Remember: <span className="capitalize">{playerOneMark}</span> goes
          first
        </h3>
      </section>
      {/* button group */}
      <div className="flex flex-col w-full gap-4">
        <Link to="game-vs-cpu">
          <ButtonComp
            text="NEW GAME (VS CPU)"
            bg="#F2B137"
            shadow="0px 5px rgba(242, 177, 55, 0.5)"
            onClick={() => setNewgame("cpu")}
          />
        </Link>
        <Link to="game">
          <ButtonComp
            text="NEW GAME (VS PLAYER)"
            bg="#31C3BD"
            shadow="0px 5px rgba(49, 195, 189, 0.5)"
            onClick={() => setNewgame("player")}
          />
        </Link>
      </div>
    </main>
  );
};

export default SelectPlayerPage;