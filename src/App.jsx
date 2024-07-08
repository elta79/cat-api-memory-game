import Gameboard from './components/Gameboard'

import './App.css'

function App() {
  // const [ revealed, setRevealed ] = useState(false)

  return (
    <>
      <div className='title'>Memory Game</div>
      <div className='rules'>Flip the cards to make a match</div>     
      <Gameboard />
    </>
  )
}

export default App
