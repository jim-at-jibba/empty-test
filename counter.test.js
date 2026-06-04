/**
 * Tests for the Counter card in app.js.
 *
 * @jest-environment jsdom
 */

beforeEach(() => {
  // Set up the minimal DOM that app.js expects for the counter.
  document.body.innerHTML = `
    <span id="count">0</span>
    <button id="increment">+1</button>
    <button id="decrement">-1</button>
    <button id="reset">Reset</button>
    <input  id="bill"     type="number" value="50" />
    <input  id="tip"      type="number" value="20" />
    <button id="calc-tip">Calculate</button>
    <span   id="total">—</span>
    <input  id="todo-input" type="text" />
    <button id="add-todo">Add</button>
    <ul     id="todo-list"></ul>
    <span   id="remaining">0</span>
    <input  id="name-input" type="text" />
    <button id="greet">Greet</button>
    <p      id="greeting"></p>
  `;

  // Re-load app.js fresh for every test so the `count` variable resets.
  jest.resetModules();
  require("./app.js");
});

test("clicking -1 decreases the count by 1", () => {
  const countEl    = document.getElementById("count");
  const increment  = document.getElementById("increment");
  const decrement  = document.getElementById("decrement");

  // Bring count to 3 first so we have room to go down.
  increment.click();
  increment.click();
  increment.click();
  expect(Number(countEl.textContent)).toBe(3);

  // Now the button under test: -1 should decrease, not increase.
  decrement.click();
  expect(Number(countEl.textContent)).toBe(2);
});

test("clicking -1 multiple times decreases the count each time", () => {
  const countEl   = document.getElementById("count");
  const increment = document.getElementById("increment");
  const decrement = document.getElementById("decrement");

  increment.click(); // count = 1
  increment.click(); // count = 2
  decrement.click(); // count should = 1
  decrement.click(); // count should = 0

  expect(Number(countEl.textContent)).toBe(0);
});
