import { words } from '../utils/constants/words';

export const randomWord = () => {
  const rand = Math.floor(Math.random() * words.length);
  return words[rand];
}
