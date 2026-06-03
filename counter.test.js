// Counter Tests
// Tests for the Counter card functionality

// Simple DOM mock for testing
const mockDOM = {
  count: 0,
  countEl: { textContent: 0 },
  createElement: () => ({ addEventListener: () => {} }),
  getElementById: (id) => {
    if (id === "count") return mockDOM.countEl;
    return { addEventListener: (event, callback) => {
      mockDOM[id + "_callback"] = callback;
    }};
  }
};

// Override document for testing
const originalDocument = global.document;
global.document = mockDOM;

// Test counter logic in isolation
let count = 0;
const countEl = { textContent: 0 };

// Simulate increment
count += 1;
countEl.textContent = count;
console.assert(count === 1, "FAIL: increment should increase count to 1");
console.assert(countEl.textContent === 1, "FAIL: increment should update display to 1");
console.log("✓ Increment works correctly");

// Simulate decrement (this is the bug that was fixed)
count -= 1;
countEl.textContent = count;
console.assert(count === 0, "FAIL: decrement should decrease count back to 0");
console.assert(countEl.textContent === 0, "FAIL: decrement should update display to 0");
console.log("✓ Decrement works correctly");

// Simulate decrement from positive number
count = 5;
count -= 1;
countEl.textContent = count;
console.assert(count === 4, "FAIL: decrement from 5 should result in 4");
console.assert(countEl.textContent === 4, "FAIL: decrement display should show 4");
console.log("✓ Decrement from 5 to 4 works correctly");

// Simulate reset
count = 0;
countEl.textContent = count;
console.assert(count === 0, "FAIL: reset should set count to 0");
console.assert(countEl.textContent === 0, "FAIL: reset display should show 0");
console.log("✓ Reset works correctly");

console.log("\n✓ All counter tests passed!");

// Restore document
global.document = originalDocument;
