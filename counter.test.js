/**
 * Tests for the Counter section of app.js (ROH-15).
 *
 * app.js is written as a plain browser script that relies on a DOM being
 * present at load time. We provide a minimal DOM via jsdom (Jest's default
 * test environment) and re-require the module fresh for each test.
 */

// @jest-environment jsdom

function loadApp() {
  // Build the minimal DOM nodes that app.js touches for the Counter section.
  document.body.innerHTML = `
    <span id="count">0</span>
    <button id="increment">+1</button>
    <button id="decrement">-1</button>
    <button id="reset">Reset</button>
    <input id="bill" />
    <input id="tip" />
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

  // Reset module registry so the script re-runs and re-attaches all listeners.
  jest.resetModules();
  require("./app.js");
}

describe("Counter – decrement button", () => {
  beforeEach(() => {
    loadApp();
  });

  test("clicking -1 decreases the count by 1", () => {
    const countEl = document.getElementById("count");
    const decrement = document.getElementById("decrement");

    // Baseline
    expect(Number(countEl.textContent)).toBe(0);

    decrement.click();

    expect(Number(countEl.textContent)).toBe(-1);
  });

  test("clicking -1 three times reaches -3", () => {
    const countEl = document.getElementById("count");
    const decrement = document.getElementById("decrement");

    decrement.click();
    decrement.click();
    decrement.click();

    expect(Number(countEl.textContent)).toBe(-3);
  });

  test("+1 then -1 returns to 0", () => {
    const countEl = document.getElementById("count");
    const increment = document.getElementById("increment");
    const decrement = document.getElementById("decrement");

    increment.click();
    expect(Number(countEl.textContent)).toBe(1);

    decrement.click();
    expect(Number(countEl.textContent)).toBe(0);
  });
});
