import './App.css'
import { useEffect } from 'react'
import Lose from './pages/Lose'
import Win from './pages/Win'
import NotFound from './pages/NotFound'
import About from './pages/About'
import Help from './pages/Help'
// import NodeList from './components/NodeList'
import CurrentGameStatus from './pages/CurrentGameStatus'
import Reason from './components/Reason'
import GameNodeViewPage from './pages/GameNodeViewPage'
import NavBar from './components/NavBar'
import useStore from './components/useStore'

function App() {
  const setGameTree = useStore((state) => state.setGameTree)
  const gameTree = useStore((state) => state.gameTree)

  useEffect(() => {
    // populate the store on mount
    setGameTree()
  }, [setGameTree])

  console.log('Game tree in App component:', gameTree)

  // const someLoseReason = new Reason('All nodes have been removed.', true);
  // const someWinReason = new Reason('The critical quantity of nodes has been exceeded.', false);

  return (
    <>
        {/* < CurrentGameStatus />  */}
        {/* < Win reason={someWinReason.reason} /> */}
        {/* < Lose reason={someLoseReason.reason} /> */}
        {/* <NotFound /> */}
        {/* <About /> */}
        {/* <Help /> */}
        {/* {<GameNodeViewPage />} */}
       <h1>Slieth</h1>
    </>
  )
}

export default App
