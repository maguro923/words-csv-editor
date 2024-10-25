import { useEffect, useState } from 'react';
import init, { get_word_distances_sorted } from './pkg';

/*
CSV should follow RFC4180 Format
https://www.rfc-editor.org/rfc/rfc4180.txt
*/
export const useSearchWord = (CSVPath: string, CSVColumnPosition: number) => {
  const [csv, setCSV] = useState<string>('');
  useEffect(() => {
    fetch(CSVPath)
      .then((v) => v.text())
      .then((s) => setCSV(s));
    init();
  }, []);

  const searchByWord = async (q: string) => {
    const { words, distances } = get_word_distances_sorted(
      q,
      csv,
      CSVColumnPosition,
    );

    return words.map((w: string, i: number) => {
      return { word: w, distance: distances[i] };
    });
  };

  return { searchByWord };
};
