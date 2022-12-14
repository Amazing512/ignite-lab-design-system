import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { rest } from "msw";
import { SignIn } from "./SignIn";

export default {
  title: "Pages/SignIn",
  component: SignIn,
  args: {},
  argTypes: {},
  parameters: {
    msw: {
      handlers: [
        rest.post("/sessions", (req, res, ctx) => {
          return res(
            ctx.json({
              message: "Login Realizado!",
            })
          );
        }),
      ],
    },
  },
} as Meta;

export const Default: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    userEvent.type(
      canvas.getByLabelText("Endereço de e-mail"),
      "email@email.com.br"
    );
    userEvent.type(canvas.getByLabelText("Sua senha"), "12345678");

    userEvent.click(canvas.getByRole("button"));

    await waitFor(() => {
      expect(canvas.getByText("Login realizado!")).toBeInTheDocument();
    });
  },
};
