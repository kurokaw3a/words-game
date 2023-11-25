import { Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import styles from './Main.module.css'
import { GameSlice } from '../store/Game/Game';

const Main = () => {
  const { themes } = useSelector((state) => state.game)
  const dispatch = useDispatch()
  const themeChange = (event) => {
    dispatch(GameSlice.actions.changeTheme(event.target.value))
  }
  const location = useLocation()
  return (
    <div className={styles.container}>
      {location.pathname === '/game'
      && (
      <select onChange={themeChange} className={styles.select}>
        <option value="day" selected={themes.day === true && 'day'} className={styles.option}>day</option>
        <option value="night" selected={themes.night === true && 'night'} className={styles.option}>night</option>
      </select>
      )}
      <Outlet />
    </div>
  )
}

export default Main;
