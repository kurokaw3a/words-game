import { Route, Routes } from 'react-router-dom';
import Game from '../Components/Game/Game';
import Hub from '../Components/Hub';
import Main from '../layouts/Main';

const Root = () => (
  <Routes>
    <Route path="" element={<Main />}>
      <Route path="/" element={<Hub />} />
      <Route path="/game" element={<Game />} />
    </Route>
  </Routes>
);

export default Root;
