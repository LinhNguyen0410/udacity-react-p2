export default function sortLeaderboardDescending(a, b) {
  let sumA = a.answered + a.created;
  let sumB = b.answered + b.created;
  if (sumA < sumB) {
    return 1;
  }
  if (sumA > sumB) {
    return -1;
  }
  // a must be equal to b
  return 0;
}
