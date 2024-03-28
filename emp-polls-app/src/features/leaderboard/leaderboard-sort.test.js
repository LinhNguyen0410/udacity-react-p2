import sortLeaderboardDescending from "./leaderboard-sort";

describe("leaderboard-sort-fn", () => {
  it("sort data in descending order", () => {
    const data = [
      { user: "#1", answered: 1, created: 1 },
      { user: "#2", answered: 2, created: 2 },
      { user: "#3", answered: 4, created: 3 },
    ];

    var actual = data.sort(sortLeaderboardDescending);

    expect(actual[0].user).toEqual("#3");
    expect(actual[0].answered).toEqual(4);
    expect(actual[0].created).toEqual(3);
  });
});
