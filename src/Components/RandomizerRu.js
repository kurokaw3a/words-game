import { Rwords } from '../utils/constants/wordsRussian';

export const randomWordRu = () => {
  const rand = Math.floor(Math.random() * Rwords.length);
  return Rwords[rand];
}
