import { Route, Routes } from 'react-router-dom';
import Main from '../Components/Main';
import Game from '../Components/Game/Game';

const Root = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/game" element={<Game />} />
  </Routes>
);

export default Root;
