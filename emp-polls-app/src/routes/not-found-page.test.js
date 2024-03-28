import NotFound from "./not-found-page";
import { render } from "@testing-library/react";

describe("not-found-component", () => {
  it("should match snapshot", async () => {
    let view = render(<NotFound />);
    expect(view).toMatchSnapshot();
  });
});
