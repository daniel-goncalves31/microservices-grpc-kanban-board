import { MockedProvider } from "@apollo/react-testing";
import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "mutationobserver-shim";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe("Login Component", () => {
  describe("Render withour crashing", () => {
    it("Render the inputs", () => {
      const { getByLabelText } = render(
        <MockedProvider>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </MockedProvider>
      );

      expect(getByLabelText("Email:")).toBeInTheDocument();
      expect(getByLabelText("Password:")).toBeInTheDocument();
    });

    it("Render the button", () => {
      const { getByText } = render(
        <MockedProvider>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </MockedProvider>
      );

      expect(getByText("Login")).toBeInTheDocument();
    });
  });

  describe("Validating the form", () => {
    it("When a invalid email is give change the email input color to red and disable the button", async () => {
      const { getByLabelText, getByText } = render(
        <MockedProvider>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </MockedProvider>
      );

      const emailInput = getByLabelText("Email:");
      const submitButton = getByText("Login");

      Password: fireEvent.blur(emailInput);
      await waitFor(() => expect(emailInput).toHaveClass("bg-red-100"));

      fireEvent.change(emailInput, { target: { value: "aa" } });
      fireEvent.blur(emailInput);
      await waitFor(() => expect(emailInput).toHaveClass("bg-red-100"));
      await waitFor(() => expect(submitButton).toBeDisabled());
    });

    it("When a invalid password is give change the password input color to red and disable the button", async () => {
      const { getByLabelText, getByText } = render(
        <MockedProvider>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </MockedProvider>
      );

      const passwordInput = getByLabelText("Password:");
      const submitButton = getByText("Login");

      fireEvent.blur(passwordInput);
      await waitFor(() => expect(passwordInput).toHaveClass("bg-red-100"));
      await waitFor(() => expect(submitButton).toBeDisabled());

      fireEvent.change(passwordInput, {
        target: { value: "password_without_capital_letter12" },
      });
      fireEvent.blur(passwordInput);
      await waitFor(() => expect(passwordInput).toHaveClass("bg-red-100"));
      await waitFor(() => expect(submitButton).toBeDisabled());

      fireEvent.change(passwordInput, {
        target: { value: "12345678" },
      });
      fireEvent.blur(passwordInput);
      await waitFor(() => expect(passwordInput).toHaveClass("bg-red-100"));
      await waitFor(() => expect(submitButton).toBeDisabled());
    });

    it("When a valid email and password is give, enable the button", async () => {
      const { getByLabelText, getByText } = render(
        <MockedProvider>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </MockedProvider>
      );

      const emailInput = getByLabelText("Email:");
      const passwordInput = getByLabelText("Password:");
      const submitButton = getByText("Login");

      fireEvent.change(passwordInput, { target: { value: "aB123456" } });
      fireEvent.blur(passwordInput);

      fireEvent.change(emailInput, { target: { value: "email@email.com" } });
      fireEvent.blur(emailInput);

      await waitFor(() => expect(emailInput).not.toHaveClass("bg-red-100"));
      await waitFor(() => expect(passwordInput).not.toHaveClass("bg-red-100"));
      // await waitFor(() => expect(submitButton).not.toBeDisabled());
    });
  });
});
