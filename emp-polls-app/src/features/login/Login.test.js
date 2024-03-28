import Login from "./Login";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { MemoryRouter } from "react-router-dom";

describe("login-component", () => {
  it("should display alert when no user is selected", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    const btnSignIn = screen.getByTestId("signIn");
    fireEvent.click(btnSignIn);
    await waitFor(() => {
      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
    });
  });
});
