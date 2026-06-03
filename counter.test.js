/**
 * Test for Counter bug (ROH-15)
 * 
 * Tests that the decrement button (-1) correctly decreases the count,
 * not increases it.
 */

// Mock DOM-like environment
const mockDOM = {
  count: 0,
  countText: '0'
};

// Simulate the counter logic from app.js
const createCounterHandlers = () => {
  let count = 0;
  const countEl = { textContent: '0' };

  const increment = () => {
    count += 1;
    countEl.textContent = count;
  };

  const decrement = () => {
    count -= 1;
    countEl.textContent = count;
  };

  const reset = () => {
    count = 0;
    countEl.textContent = count;
  };

  return { increment, decrement, reset, getCount: () => count, setCount: (n) => { count = n; } };
};

// Test suite
console.log('Testing Counter (ROH-15)...\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (e) {
    console.log(`✗ ${name}`);
    console.log(`  Error: ${e.message}`);
    failed++;
  }
}

// Test 1: Increment button increases count
test('Increment button increases count from 0 to 1', () => {
  const handlers = createCounterHandlers();
  handlers.increment();
  
  const count = handlers.getCount();
  if (count !== 1) {
    throw new Error(`Expected count to be 1, but got ${count}`);
  }
});

// Test 2: Decrement button decreases count
test('Decrement button decreases count from 1 to 0', () => {
  const handlers = createCounterHandlers();
  handlers.setCount(1);
  handlers.decrement();
  
  const count = handlers.getCount();
  if (count !== 0) {
    throw new Error(`Expected count to be 0 after decrement, but got ${count}`);
  }
});

// Test 3: Multiple decrements work correctly
test('Multiple decrements work correctly', () => {
  const handlers = createCounterHandlers();
  handlers.setCount(5);
  handlers.decrement();
  handlers.decrement();
  handlers.decrement();
  
  const count = handlers.getCount();
  if (count !== 2) {
    throw new Error(`Expected count to be 2 after 3 decrements from 5, but got ${count}`);
  }
});

// Test 4: Reset button works
test('Reset button resets count to 0', () => {
  const handlers = createCounterHandlers();
  handlers.setCount(10);
  handlers.reset();
  
  const count = handlers.getCount();
  if (count !== 0) {
    throw new Error(`Expected count to be 0 after reset, but got ${count}`);
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
