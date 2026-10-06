import { useState } from 'react'
import { clsx } from "clsx"
import { languages } from './languages'
function App() {
  const [currentWord,setCurrentWord] =useState("react")
  const [guessedLetter,setGuessedLetters]=useState([])

  const countWrong=guessedLetter.filter(letter => !currentWord.includes(letter)).length

  const isGameWon = currentWord.split("").every(letter => guessedLetter.includes(letter))
  const isGameLost = countWrong>languages.length-1
  const isGameOver=isGameWon ||isGameLost
  const alphabets="abcdefghijklmnopqrstuvwxyz"
  function addGuessedLetter(letter){
    setGuessedLetters(prevLetters=> {
   const HashSet = new Set(prevLetters)
   HashSet.add(letter)
   return Array.from(HashSet)
    }
  )
  }
  const langs=languages.map((lang,index) =>{
    const isLanguageLost =index < countWrong
    const styles={
    backgroundColor:lang.backgroundColor,
    color: lang.color
  }
  const className=clsx("chip",isLanguageLost && "lost")
    return(
    <span className={className} key={lang.name} style={styles}>{lang.name}</span>
  )
})
const letterElements =currentWord.split("").map((letter,index) =>(
  <span key={index} className='letter'>{
    guessedLetter.includes(letter)?letter.toUpperCase():""}</span>
))

const keyboardElements=alphabets.split("").map(letter =>{
  const isGuessed= guessedLetter.includes(letter)
  const isCorrect =isGuessed && currentWord.includes(letter)
  const isWrong =isGuessed && !currentWord.includes(letter)
  const className=clsx({
    correct: isCorrect,
    wrong: isWrong,
  })
  return(
  <button 
  key={letter} 
  className={className} 
  onClick={()=>addGuessedLetter(letter)}>{letter.toUpperCase()}
  </button>)
})
const gameStatusClass=clsx("game-status",{
  won:isGameWon,
  lost:isGameLost
})
  return (
    <>
    <main>
      <header>
        <h1>Assembly:Endgame</h1>
        <p>Guess the word within 8 attempts to keep the 
          programming world safe from Assembly!</p>
      </header>
      <section className={gameStatusClass}>
        { isGameOver ?
          (isGameWon?(
          <>
          <h2>You Win!</h2>
          <p>Awesome 🎊</p>
          </>):(
            <>
          <h2>Game Lost</h2>
          <p>Get Good kiddo!</p>
          </>)
          )
          :
          (null)
        }
      </section>
      <section className='lang-chips'>
        {langs}
      </section>
      <section className='word'>
        {letterElements}
      </section>
      <section className='keyboard'>
        {keyboardElements}
      </section>
      {isGameOver &&<button className='new-game'>New Game</button>}
    </main>
    </>
  )
}

export default App
