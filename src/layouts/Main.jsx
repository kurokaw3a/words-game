import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles from './Main.module.css'

const Main = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme'))
  const themeChange = (event) => {
    setTheme(event.target.value)
    localStorage.setItem('theme', event.target.value)
    window.location.reload()
  }
  const location = useLocation()
  return (
    <div className={styles.container}>
      {location.pathname === '/game'
      && (
      <select onChange={themeChange} className={styles.select}>
        <option value="day" selected={theme === 'day'} className={styles.option}>day</option>
        <option value="night" selected={theme === 'night'} className={styles.option}>night</option>
      </select>
      )}
      <Outlet theme={theme} />
    </div>
  )
}

export default Main;
