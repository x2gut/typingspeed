export const getWpm = (
  сhars: number,
  avgWordLength: number,
  totalTime: number
) => {
  let wpm = Math.round(
    (сhars / avgWordLength / totalTime) * 60
  );
  wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  return wpm;
};


