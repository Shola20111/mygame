
import { Route, Routes } from 'react-router-dom'
import Game from './page/game'
import SelectPlayerPage from './page/selectPlayerPage'
import { useState } from 'react';
import GameVsCpu from './page/gameVsCpu';


function App() {
   const [playerOneMark, setPlayerOneMark] = useState("X");
    const [playerTwoMark, setPlayerTwoMark] = useState('O');
  return (
    <main className='w-full h-screen bg-[#0E1216] flex items-center justify-center'>
      <Routes>
        <Route path='/' element={<SelectPlayerPage setPlayerOneMark={ setPlayerOneMark} setPlayerTwoMark={ setPlayerTwoMark} playerOneMark={ playerOneMark} playerTwoMark={playerTwoMark} />} />
        <Route path='/game' element={<Game setPlayerOneMark={ setPlayerOneMark} setPlayerTwoMark={ setPlayerTwoMark} playerOneMark={ playerOneMark} playerTwoMark={playerTwoMark}/>} />
        {/* game-vs-cpu */}
        <Route path="/game-vs-cpu" element={<GameVsCpu setPlayerOneMark={setPlayerOneMark} playerOneMark={playerOneMark} setPlayerTwoMark={setPlayerTwoMark} playerTwoMark={playerTwoMark} />} />
      </Routes>
      
      
    </main>
  )
}

export default App
