import './App.css'
import Lose from './pages/Lose'
import Win from './pages/Win'
import NotFound from './pages/NotFound'
import About from './pages/About'
import Help from './pages/Help'
// import NodeList from './components/NodeList'
import CurrentGameStatus from './pages/CurrentGameStatus'
import Reason from './components/Reason'
import GameNodeViewPage from './pages/GameNodeViewPage'

function App() {
  // const someLoseReason = new Reason('All nodes have been removed.', true);
  const someWinReason = new Reason('The critical quantity of nodes has been exceeded.', false);

  return (
    <>
        {/* < CurrentGameStatus />  */}
        {/* < Win reason={someWinReason.reason} /> */}
        {/* < Lose reason={someLoseReason.reason} /> */}
        {/* <NotFound /> */}
        {/* <About /> */}
        {/* <Help /> */}
        {<GameNodeViewPage />}
    </>
  )
}

export default App
