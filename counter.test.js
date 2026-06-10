/**
 * Tests for the Counter feature (ROH-15).
 *
 * app.js reads DOM elements on load, so we must set up the required HTML
 * before requiring it.
 */

beforeEach(() => {
  // Provide the DOM nodes app.js expects for the counter.
  document.body.innerHTML = `
    <span id="count">0</span>
    <button id="increment">+1</button>
    <button id="decrement">-1</button>
    <button id="reset">Reset</button>
    <input id="bill" value="50" />
    <input id="tip" value="20" />
    <button id="calc-tip">Calculate</button>
    <span id="total"></span>
    <input id="todo-input" />
    <button id="add-todo">Add</button>
    <ul id="todo-list"></ul>
    <span id="remaining">0</span>
    <input id="name-input" />
    <button id="greet">Greet</button>
    <p id="greeting"></p>
  `;

  // Clear module cache so app.js re-runs and attaches fresh listeners.
  jest.resetModules();
  require("./app.js");
});

test("increment button increases count by 1", () => {
  document.getElementById("increment").click();
  expect(document.getElementById("count").textContent).toBe("1");
});

test("decrement button decreases count by 1 (ROH-15)", () => {
  // Start at 0, click -1, should go to -1 (not +1).
  document.getElementById("decrement").click();
  expect(document.getElementById("count").textContent).toBe("-1");
});

test("decrement after increment returns to 0", () => {
  document.getElementById("increment").click(); // count = 1
  document.getElementById("decrement").click(); // count = 0
  expect(document.getElementById("count").textContent).toBe("0");
});

test("reset button sets count back to 0", () => {
  document.getElementById("increment").click();
  document.getElementById("increment").click();
  document.getElementById("reset").click();
  expect(document.getElementById("count").textContent).toBe("0");
});
