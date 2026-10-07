import { useState } from 'react'
import { clsx } from "clsx"
import { languages } from './languages'
import {getFarewellText} from "./utils"
import Confetti from "react-confetti"
import { getRandomWord } from './utils'
function App() {
  const [currentWord,setCurrentWord] =useState(()=>getRandomWord())
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
  function startNewGame(){
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
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
const letterElements =currentWord.split("").map((letter,index) =>{
  const shouldReveal= isGameLost || guessedLetter.includes(letter)
  const letterClassName=clsx(isGameLost && !guessedLetter.includes(letter) && "missed-letters")
  return(<span key={index} className={letterClassName}>{
    shouldReveal?letter.toUpperCase():""}
  </span>)
})
const lastGuessedLetter =guessedLetter[guessedLetter.length-1]
const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

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
  disabled={isGameOver}
  aria-label={`Letter ${letter}`}
  aria-disabled={guessedLetter.includes(letter)}
  onClick={()=>addGuessedLetter(letter)}>{letter.toUpperCase()}
  </button>)
})
const gameStatusClass=clsx("game-status",{
  won:isGameWon,
  lost:isGameLost
})
function renderGameStatus(){
  if(!isGameOver && isLastGuessIncorrect){
    return <p className='farewell-message'>
      {getFarewellText(languages[countWrong-1].name)}
      </p>
  }
  if(isGameWon){
    return(
      <>
          <h2>You Win!</h2>
          <p>Awesome 🎊</p>
      </>
    )
  }if(isGameLost){
    return(
       <>
          <h2>Game Lost</h2>
          <p>Get Good kiddo!</p>
       </>
)
  }
}
  return (
    <>
    <main>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000}/>}
      <header>
        <h1>Assembly:Endgame</h1>
        <p>Guess the word within 8 attempts to keep the 
          programming world safe from Assembly!</p>
      </header>
      <section aria-live="polite" role="status" className={gameStatusClass}>
        {renderGameStatus()}
      </section>
      <section className='lang-chips'>
        {langs}
      </section>
      <section className='word'>
        {letterElements}
      </section>
      <section className="sr-only" aria-live="polite" role="status">
        <p>{currentWord.includes(lastGuessedLetter)? `Correct! The letter ${lastGuessedLetter} is in the word.`:`Sorry,the letter ${lastGuessedLetter} is not in the word.${languages.length-1} Guesses left`}</p>
        <p>Current Word: {currentWord.split("").map(letter=>
        guessedLetter.includes(letter)?letter:"blank").join(" ")}</p>
      </section>
      <section className='keyboard'>
        {keyboardElements}
      </section>
      {isGameOver &&<button className='new-game' onClick={startNewGame}>New Game</button>}
    </main>
    </>
  )
}

export default App
