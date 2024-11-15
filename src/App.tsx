import './App.scss'

import Board from './components/Board/Board'
import Search from './components/Search/Search'

function App() {
  return (
    <main className='app'>
      <header className='app__header'>
        <Search />
      </header>
      <Board />
    </main>
  )
}

export default App
