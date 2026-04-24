import './App.css'
import { use, useEffect } from 'react'
import useStore from './components/useStore'

function App() {
  const setGameTree = useStore((state) => state.setGameTree)
  const gameTree = useStore((state) => state.gameTree)
  const setGameTreeDisplayObj = useStore((state) => state.setGameTreeDisplayObj)
  const gameTreeDisplayObj = useStore((state) => state.gameTreeDisplayObj)

  useEffect(() => {
          setGameTree()
  }, [setGameTree])

  useEffect(() => {
          if(gameTree?.nodes) {
              setGameTreeDisplayObj()
          }
  }, [gameTree, setGameTreeDisplayObj])

  console.log('Game tree in App component:', gameTree)

  return (
    <>
       <h1>Slieth</h1>
    </>
  )
}

export default App
