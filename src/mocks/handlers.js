import { rest } from "msw";
import { projects } from "./data";

export const handlers = [
  rest.get(`${import.meta.env.VITE_API_URL}/projects`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(projects));
  }),
];
