import './App.css'
import { useEffect } from 'react'
import useStore from './components/useStore'
import { MainMenu } from './components/MainMenu'

// TODO: run default setGameTree effect upon clicking Start button
// TODO: track progress state of game in store
// TODO: implement in progress route
// TODO: implement start/progress route click event control flow based on progress state
// TODO: warn of game deletion if there is a game in progress when navigating away
// TODO: persist state on refresh
// TODO: update current node index in tree DB
// TODO: tree operations
// TODO: win/lose conditions based on formula relating sequelae and carrots
// TODO: implement simple games (basic arithmetic/tasks, word/fact search, trivia, simple geometry nodes)
// TODO: persist from browser session
// TODO: aesthetic layer
// TODO: testing/security/cicd layer
// TODO: deployment/hosting layer
// TODO: centralized admin layer with auth

function App() {
  const resumeGame = useStore((state) => state.resumeGame);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);
  const gameTree = useStore((state) => state.gameTree);

  useEffect(() => {
    const persistedGameId = localStorage.getItem('sliethGameId');
    if (persistedGameId) {
      resumeGame();
    }
  }, [resumeGame]);

  return (
    <>
       <h1>Slieth</h1>
       {isLoading && <p>Resuming saved game…</p>}
       {error && <p className="error">{error}</p>}
       {!isLoading && !gameTree?.nodes?.length && !error && (
         <p>Start a new game or resume a saved one.</p>
       )}
       <MainMenu />
    </>
  )
}

export default App
