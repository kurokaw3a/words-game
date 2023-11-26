/* eslint-disable react/button-has-type */
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Options.module.css'
import { GameSlice } from '../../store/Game/Game'

const Options = () => {
  const navigate = useNavigate()
  const main = () => {
    navigate('/')
  }
  const dispatch = useDispatch()
  const { lang } = useSelector((state) => state.game)
  const changeLanguage = (event) => {
    dispatch(GameSlice.actions.changeLang(event.target.value))
  }
  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.select}>
          <h1>Game Language</h1>
          <select onChange={changeLanguage} className={styles.language}>
            <option value="en" selected={lang.en} className={styles.option}>English</option>
            <option value="ru" selected={lang.ru} className={styles.option}>Russian</option>
          </select>
        </div>
        <button onClick={main} className={styles.mainButton}>back to main</button>
      </div>
    </div>
  )
}

export default Options;
