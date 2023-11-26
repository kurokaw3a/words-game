import { Route, Routes } from 'react-router-dom';
import Game from '../Components/Game/Game';
import Hub from '../Components/Hub';
import Main from '../layouts/Main';
import Options from '../Components/Options/Options';

const Root = () => (
  <Routes>
    <Route path="" element={<Main />}>
      <Route path="/" element={<Hub />} />
      <Route path="/game" element={<Game />} />
      <Route path="/options" element={<Options />} />
    </Route>
  </Routes>
);

export default Root;
