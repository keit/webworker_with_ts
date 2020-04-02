import { square } from "../utils/calc";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ctx: Worker = self as any;

ctx.addEventListener("message", async event => {
  console.log("worker received", event.data);
  const res = square(event.data);
  ctx.postMessage({ input: event.data, output: res });
});

export default ctx;
