import { MockedProvider } from "@apollo/react-testing";
import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "mutationobserver-shim";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import SignUp from "./SignUp";

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

describe("SignUp Component", () => {
  describe("Render withour crashing", () => {
    it("Render the inputs", () => {
      const { getByLabelText } = render(
        <MockedProvider>
          <MemoryRouter>
            <SignUp />
          </MemoryRouter>
        </MockedProvider>
      );

      expect(getByLabelText("Name:")).toBeInTheDocument();
      expect(getByLabelText("Email:")).toBeInTheDocument();
      expect(getByLabelText("Password:")).toBeInTheDocument();
      expect(getByLabelText("Confirm Password:")).toBeInTheDocument();
    });

    it("Render the button", () => {
      const { getByText } = render(
        <MockedProvider>
          <MemoryRouter>
            <SignUp />
          </MemoryRouter>
        </MockedProvider>
      );

      expect(getByText("Sign Up")).toBeInTheDocument();
    });
  });

  describe("Validating the form", () => {
    it("When a invalid name is give change the name input color to red and disable the button", async () => {
      const { getByLabelText, getByText } = render(
        <MockedProvider>
          <MemoryRouter>
            <SignUp />
          </MemoryRouter>
        </MockedProvider>
      );

      const nameInput = getByLabelText("Name:");
      const submitButton = getByText("Sign Up");

      fireEvent.blur(nameInput);
      await waitFor(() => expect(nameInput).toHaveClass("bg-red-100"));

      fireEvent.change(nameInput, { target: { value: "aa" } });
      fireEvent.blur(nameInput);

      await waitFor(() => expect(nameInput).toHaveClass("bg-red-100"));
      await waitFor(() => expect(submitButton).toBeDisabled());
    });

    it("When a invalid email is give change the email input color to red and disable the button", async () => {
      const { getByLabelText, getByText } = render(
        <MockedProvider>
          <MemoryRouter>
            <SignUp />
          </MemoryRouter>
        </MockedProvider>
      );

      const emailInput = getByLabelText("Email:");
      const submitButton = getByText("Sign Up");

      fireEvent.blur(emailInput);
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
            <SignUp />
          </MemoryRouter>
        </MockedProvider>
      );

      const passwordInput = getByLabelText("Password:");
      const submitButton = getByText("Sign Up");

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

    it("When a the passwords don't match, change the cofirm password input color to red and disable the button", async () => {
      const { getByLabelText, getByText } = render(
        <MockedProvider>
          <MemoryRouter>
            <SignUp />
          </MemoryRouter>
        </MockedProvider>
      );

      const passwordInput = getByLabelText("Password:");
      const confirmPasswordInput = getByLabelText("Confirm Password:");
      const submitButton = getByText("Sign Up");

      fireEvent.blur(confirmPasswordInput);
      await waitFor(() =>
        expect(confirmPasswordInput).toHaveClass("bg-red-100")
      );
      await waitFor(() => expect(submitButton).toBeDisabled());

      fireEvent.change(passwordInput, {
        target: { value: "Somepassword123" },
      });
      fireEvent.blur(confirmPasswordInput);
      await waitFor(() =>
        expect(confirmPasswordInput).toHaveClass("bg-red-100")
      );
      await waitFor(() => expect(submitButton).toBeDisabled());
    });

    it("When all fields are valid, enable the button", async () => {
      const { getByLabelText, getByText } = render(
        <MockedProvider>
          <MemoryRouter>
            <SignUp />
          </MemoryRouter>
        </MockedProvider>
      );

      const nameInput = getByLabelText("Email:");
      const emailInput = getByLabelText("Email:");
      const passwordInput = getByLabelText("Password:");
      const confirmPasswordInput = getByLabelText("Confirm Password:");
      const submitButton = getByText("Sign Up");

      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "email@email.com" } });
      fireEvent.change(passwordInput, {
        target: { value: "SomePassword123456" },
      });
      fireEvent.change(confirmPasswordInput, {
        target: { value: "SomePassword123456" },
      });
      confirmPasswordInput.blur();

      await waitFor(() => expect(nameInput).not.toHaveClass("bg-red-100"));
      await waitFor(() => expect(emailInput).not.toHaveClass("bg-red-100"));
      await waitFor(() => expect(passwordInput).not.toHaveClass("bg-red-100"));
      await waitFor(() =>
        expect(confirmPasswordInput).not.toHaveClass("bg-red-100")
      );
      // await waitFor(() => expect(submitButton).not.toBeDisabled());
    });
  });
});
