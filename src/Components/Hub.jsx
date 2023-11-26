/* eslint-disable no-mixed-operators */
/* eslint-disable react/button-has-type */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Hub.module.css'
import { randomWord } from './Randomizer';
import { randomWordRu } from './RandomizerRu';

const Hub = () => {
  const { lang } = useSelector((state) => state.game)
  const random = lang.en && randomWord || lang.ru && randomWordRu
  const [word, setWord] = useState(random())
  setTimeout(() => {
    setWord(random())
  }, 500);

  const navigate = useNavigate()
  const play = () => {
    navigate('/game')
  }
  const options = () => {
    navigate('/options')
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.randomWord}>{word}</h1>
      <div className={styles.navigation}>
        <h1 className={styles.title}>{lang.en && 'The words game' || lang.ru && 'Игра слов'}</h1>
        <button onClick={play} className={styles.playButton}>Play</button>
        <button onClick={options} className={styles.optionsButton}>options</button>
      </div>
    </div>
  )
}

export default Hub;
