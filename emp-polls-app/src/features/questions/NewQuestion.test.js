import NewQuestion from "./NewQuestion";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { MemoryRouter } from "react-router-dom";

describe("new-question-component", () => {
  it("should render", async () => {
    let view = render(
      <Provider store={store}>
        <MemoryRouter>
          <NewQuestion />
        </MemoryRouter>
      </Provider>
    );
    const optionOne = screen.getByLabelText("First Option");
    expect(optionOne).toHaveValue("");
    const optionTwo = screen.getByLabelText("Second Option");
    expect(optionTwo).toHaveValue("");
    const btnSubmit = screen.getByRole("button");
    expect(btnSubmit).toBeDisabled();
  });

  it("submit button is enabled when form is valid", async () => {
    let view = render(
      <Provider store={store}>
        <MemoryRouter>
          <NewQuestion />
        </MemoryRouter>
      </Provider>
    );
    const optionOne = screen.getByLabelText("First Option");
    expect(optionOne).toHaveValue("");
    const optionTwo = screen.getByLabelText("Second Option");
    expect(optionTwo).toHaveValue("");
    const btnSubmit = screen.getByRole("button");
    expect(btnSubmit).toBeDisabled();
    fireEvent.change(optionOne, { target: { value: "use react native" } });
    fireEvent.change(optionTwo, { target: { value: "use flutter" } });
    await waitFor(() => {
      expect(btnSubmit).not.toBeDisabled();
    });
  });
});
