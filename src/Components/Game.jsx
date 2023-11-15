/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import { randomWord } from './Randomizer';
import styles from './Game.module.css'

function Game() {
  const [currentWord, setCurrentWord] = useState(randomWord())
  const [input, setInput] = useState('')
  const [correct, setCorrect] = useState(0)

  const [showMistakes, setShowMistakes] = useState(false)
  const [mistakesCount, setMistakesCount] = useState(0)
  const [mistakes, setMistakes] = useState([])
  const [mistake, setMistake] = useState([])

  const [start, setStart] = useState(false)
  const [end, setEnd] = useState(false)

  const [rating, setRating] = useState(100)
  const [difficult, setDifficult] = useState(10)

  const difficultHandler = (event) => {
    setDifficult(Number(event.target.value))
  }
  const onStart = () => {
    if (!start) {
      setStart(true)
    }
  }
  const inputChangeHandler = (event) => {
    setInput(event.target.value)
  }
  const checkWord = (event) => {
    event.preventDefault()
    if (input.trim() === currentWord && correct < difficult) {
      setCorrect((prev) => prev + 1)
      setCurrentWord(randomWord())
    }
    if (input.trim() !== currentWord && input.trim() !== '') {
      setMistakesCount((prev) => prev + 1)
      mistakes.push(currentWord)
      mistake.push(input.trim())
      if (rating > 0) {
        setRating((prev) => prev - 5)
      }
    }
    if (input.trim() === currentWord && correct === difficult) {
      setEnd(true)
      setInput('')
      setCurrentWord('finish')
    }
    setInput('')
  }
  const retry = () => {
    setCorrect(0)
    setInput('')
    setMistakesCount(0)
    setMistakes([])
    setMistake([])
    setCurrentWord(randomWord())
    setShowMistakes(false)
    setEnd(false)
    setStart(false)
  }
  const showMistakesHandler = () => {
    if (mistakes.length >= 1) { setShowMistakes((prev) => !prev) }
  }
  return (
    <div>
      <div className={styles.container}>
        <form className={styles.block} onSubmit={checkWord}>
          <h1 className={styles.word}>{currentWord}</h1>
          <input className={styles.input} onFocus={onStart} disabled={end} placeholder={currentWord} value={input} onChange={inputChangeHandler} type="text" />
          {end === false ? (
            <div className={styles.correctBlock}>
              <p className={end ? styles.correct : styles.uncorrect}>
                {correct}
              </p>
              /
              <select className={styles.select} onChange={difficultHandler} disabled={start}>
                <option className={styles.option} value={difficult}>10</option>
                <option className={styles.option} value={20}>20</option>
                <option className={styles.option} value={30}>30</option>
                <option className={styles.option} value={40}>40</option>
                <option className={styles.option} value={50}>50</option>
              </select>
            </div>
          ) : (
            <div className={styles.retryBlock}>
              <div className={styles.resultBlock}>
                <p>Result:</p>
                <p className={styles.result}>
                  {correct}
                  /
                  {difficult}
                </p>
              </div>
              <div className={styles.resultBlock}>
                <p>Mistakes:</p>
                <p className={styles.mistakesResult} onClick={showMistakesHandler}>
                  {mistakesCount}
                </p>
              </div>
              <div className={styles.resultBlock}>
                <p className={rating >= 70 ? styles.goodRating : styles.badRating}>{rating >= 70 && 'Good' || rating <= 50 && 'Bad'}</p>
              </div>
              <img className={styles.retryIcon} onClick={retry} src="https://static.thenounproject.com/png/1921228-200.png" alt="none" />
            </div>
          )}
        </form>
        {showMistakes && (
        <div className={styles.mistakesBlock}>
          <div>
            {mistakes.map((el) => (
              <li className={styles.mistake}>{el}</li>
            ))}
          </div>
          <div>
            {mistake.map((el) => (
              <p style={{ color: 'red' }}>
                {el}
              </p>
            ))}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default Game;
