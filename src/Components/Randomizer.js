import { words } from '../utils/constants/words';

export function randomWord() {
  const rand = Math.floor(Math.random() * words.length);
  return words[rand];
}
