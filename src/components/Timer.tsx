import { FC, useEffect, useRef, useState } from 'react'
import { Colors } from '../models/Colors'
import { Player } from '../models/Player'

interface ITimerProps {
  currentPlayer: Player | null
  restart: () => void
}

export const Timer: FC<ITimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState(300)
  const [whiteTime, setWhiteTime] = useState(300)
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    startTimer()
  }, [currentPlayer])

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }
    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhitePlayerTimer
        : decrementBlackPlayerTimer

    timer.current = setInterval(callback, 1000)
  }
  function decrementBlackPlayerTimer() {
    setBlackTime((prev) => prev - 1)
  }
  function decrementWhitePlayerTimer() {
    setWhiteTime((prev) => prev - 1)
  }

  const handleRestart = () => {
    setBlackTime(10)
    setWhiteTime(10)
    restart()
  }

  return (
    <div>
      <div>
        <button onClick={handleRestart}>Restart</button>
      </div>
      <h2>Black - {blackTime}</h2>
      <h2>White - {whiteTime}</h2>
      {blackTime === 0 && <p>Black loose</p>}
      {whiteTime === 0 && <p>White loose</p>}
    </div>
  )
}
