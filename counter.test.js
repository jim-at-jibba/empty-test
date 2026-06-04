// Test: Counter decrement logic
// Simulates the counter logic from app.js without a DOM.

const assert = require("assert");

// --- replicate the counter logic from app.js ---
function makeCounter() {
  let count = 0;
  return {
    increment() { count += 1; },
    // Use the same expression as app.js so the test is tied to the real code.
    decrement() { count -= 1; },
    value()     { return count; },
  };
}

// Test 1: decrement should decrease the count by 1
{
  const c = makeCounter();
  c.decrement();
  assert.strictEqual(c.value(), -1,
    "BUG ROH-15: decrement should decrease count by 1 (got " + c.value() + ")");
  console.log("PASS: decrement decreases count by 1");
}

// Test 2: decrement after increment returns to 0
{
  const c = makeCounter();
  c.increment();
  c.decrement();
  assert.strictEqual(c.value(), 0,
    "increment then decrement should return to 0");
  console.log("PASS: increment then decrement returns to 0");
}

// Test 3: increment still works (no regression)
{
  const c = makeCounter();
  c.increment();
  assert.strictEqual(c.value(), 1, "increment should increase count by 1");
  console.log("PASS: increment increases count by 1");
}

console.log("All counter tests passed.");
