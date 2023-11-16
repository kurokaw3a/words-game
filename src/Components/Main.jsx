/* eslint-disable react/button-has-type */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Main.module.css'
import { randomWord } from './Randomizer';

const Main = () => {
  const [word, setWord] = useState(randomWord())
  setTimeout(() => {
    setWord(randomWord())
  }, 500);

  const navigate = useNavigate()
  const play = () => {
    navigate('/game')
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.randomWord}>{word}</h1>
      <div className={styles.navigation}>
        <h1 className={styles.title}>The words game</h1>
        <button onClick={play} className={styles.playButton}>Play</button>
        <button onClick={() => alert('Coming soon')} className={styles.optionsButton}>options</button>
      </div>
    </div>
  )
}

export default Main;
