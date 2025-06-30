// import { useEffect } from "react";


// const CpuPlayer = ({
//   newGame,
//   playerTurn,
//   playerTwoMark,
//   gameButtons,
//   handleButtonClick,
//   showModal,
//   ShowTieModal,
//   showResetModal,
// }) => {
//   useEffect(() => {
//     const isVsCPU = newGame === "cpu";
//     const isCPUTurn = isVsCPU && playerTurn === playerTwoMark;
//     const isGameOver = showModal || ShowTieModal || showResetModal;
//     const boardFull = gameButtons.every(val => val !== " ");

//     if (isCPUTurn && !isGameOver && !boardFull) {
//       const timer = setTimeout(() => {
//         const emptyIndexes = gameButtons
//           .map((val, idx) => (val === " " ? idx : null))
//           .filter(val => val !== null);

//         if (emptyIndexes.length === 0) return;

//         const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
//         handleButtonClick(randomIndex);
//       }, 500); // 500ms delay to simulate "thinking"

//       return () => clearTimeout(timer);
//     }
//   }, [newGame, playerTurn, playerTwoMark, gameButtons, handleButtonClick, showModal, ShowTieModal, showResetModal]);

//   return (
//     <>
//     cpu player</>
//   );
// };

// export default CpuPlayer;