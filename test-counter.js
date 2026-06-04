// Test for Counter bug (ROH-15)
// Tests that the decrement button correctly decreases the count

const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

// Read the HTML and JS files
const htmlContent = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const jsContent = fs.readFileSync(path.join(__dirname, "app.js"), "utf8");

// Helper to create a fresh JSDOM instance with app.js loaded
function createDOM() {
  const dom = new JSDOM(htmlContent, {
    url: "http://localhost",
    runScripts: "outside-only",
  });
  const { window } = dom;
  const { document } = window;
  window.eval(jsContent);
  return { window, document };
}

// For the tests, we'll use a single instance
const { window, document } = createDOM();

// Test: Increment button should increase count
function testIncrementButton() {
  const dom = createDOM();
  const { document } = dom;
  
  // Simulate clicking the increment button
  const incrementBtn = document.getElementById("increment");
  const clickEvent = new dom.window.Event("click");
  incrementBtn.dispatchEvent(clickEvent);
  
  const countEl = document.getElementById("count");
  const result = parseInt(countEl.textContent);
  const expected = 1;
  
  if (result === expected) {
    console.log("✓ PASS: Increment button correctly increases count");
    console.log(`  Expected: ${expected}, Got: ${result}`);
    return true;
  } else {
    console.log("✗ FAIL: Increment button does not increase count");
    console.log(`  Expected: ${expected}, Got: ${result}`);
    return false;
  }
}

// Test: Decrement button should decrease count
function testDecrementButton() {
  const dom = createDOM();
  const { document } = dom;
  
  // Simulate clicking the decrement button
  const decrementBtn = document.getElementById("decrement");
  const clickEvent = new dom.window.Event("click");
  decrementBtn.dispatchEvent(clickEvent);
  
  const countEl = document.getElementById("count");
  const result = parseInt(countEl.textContent);
  
  // After one click of decrement, count should be -1
  const expected = -1;
  
  if (result === expected) {
    console.log("✓ PASS: Decrement button correctly decreases count");
    console.log(`  Expected: ${expected}, Got: ${result}`);
    return true;
  } else {
    console.log("✗ FAIL: Decrement button does not decrease count");
    console.log(`  Expected: ${expected}, Got: ${result}`);
    return false;
  }
}

// Test: Reset button should reset count to 0
function testResetButton() {
  const dom = createDOM();
  const { document } = dom;
  
  // First increment to change count from 0
  const incrementBtn = document.getElementById("increment");
  const incrementEvent = new dom.window.Event("click");
  incrementBtn.dispatchEvent(incrementEvent);
  
  // Then reset
  const resetBtn = document.getElementById("reset");
  const resetEvent = new dom.window.Event("click");
  resetBtn.dispatchEvent(resetEvent);
  
  const countEl = document.getElementById("count");
  const result = parseInt(countEl.textContent);
  const expected = 0;
  
  if (result === expected) {
    console.log("✓ PASS: Reset button correctly resets count");
    console.log(`  Expected: ${expected}, Got: ${result}`);
    return true;
  } else {
    console.log("✗ FAIL: Reset button does not reset count");
    console.log(`  Expected: ${expected}, Got: ${result}`);
    return false;
  }
}

// Run all tests
console.log("Running Counter Tests...\n");
const test1 = testIncrementButton();
const test2 = testDecrementButton();
const test3 = testResetButton();

console.log("\n" + "=".repeat(50));
const passed = [test1, test2, test3].filter(Boolean).length;
const total = 3;
console.log(`Results: ${passed}/${total} tests passed`);

if (passed === total) {
  console.log("All tests passed!");
  process.exit(0);
} else {
  console.log("Some tests failed!");
  process.exit(1);
}
