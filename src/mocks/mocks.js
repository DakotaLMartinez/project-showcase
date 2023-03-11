const { setupWorker, rest } = require("msw");
const { handlers } = require("./handlers");
const worker = setupWorker(...handlers);
// Make the `worker` and `rest` references available globally,
// so they can be accessed in both runtime and test suites.
window.msw = {
  worker,
  rest,
};
