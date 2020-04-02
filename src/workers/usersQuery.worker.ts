import { findUsers } from "../utils/userDB";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ctx: Worker = self as any;

ctx.addEventListener("message", async event => {
  console.log("worker received", event.data);
  const res = findUsers(event.data);
  ctx.postMessage({ input: event.data, output: res });
});

export default ctx;
