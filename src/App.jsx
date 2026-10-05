import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
    <main>
      <header>
        <h1>Assembly:Endgame</h1>
        <p>Guess the word within 8 attempts to keep the 
          programming world safe from Assembly!</p>
      </header>
      <section className='status'>
        <h2>You Win!</h2>
        <p>Awesome 🎊</p>
      </section>
    </main>
    </>
  )
}

export default App
