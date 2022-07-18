import { useEffect, useState } from 'react'
import './App.css'
import BoardComponent from './components/BoardComonent'
import { LostFigures } from './components/LostFigures'
import { Timer } from './components/Timer'
import { Board } from './models/Board'
import { Colors } from './models/Colors'
import { Player } from './models/Player'

function App() {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
  }, [])

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    )
  }

  function restart() {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  return (
    <div className="app">
      <Timer currentPlayer={currentPlayer} restart={restart} />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures title={Colors.BLACK} figures={board.lostBlackFigures} />
        <LostFigures title={Colors.WHITE} figures={board.lostWhiteFigures} />
      </div>
    </div>
  )
}

export default App
