import authUserReducer, { setAuthUser } from "./authUserSlice";

describe("authUser reducer", () => {
  const initialState = {
    current: null,
  };
  it("should handle setAuthUser", () => {
    const user = {
      id: "sarahedo",
      name: "Sarah Edo",
    };
    const actual = authUserReducer(initialState, setAuthUser(user));
    expect(actual.current).toEqual(user);
  });
});
