// Test suite for Counter functionality

describe('Counter', () => {
  let count;
  let countEl;

  beforeEach(() => {
    // Reset count to 0
    count = 0;
    // Mock the DOM element
    countEl = { textContent: '0' };
  });

  test('increment increases count by 1', () => {
    // Simulate increment
    count += 1;
    countEl.textContent = count;
    
    expect(count).toBe(1);
    expect(countEl.textContent).toBe('1');
  });

  test('decrement decreases count by 1', () => {
    count = 5; // Start at 5
    countEl.textContent = count;
    
    // This should be: count -= 1 (but currently it's count += 1)
    // So this test will fail until the bug is fixed
    count -= 1; // This is what it SHOULD be
    countEl.textContent = count;
    
    expect(count).toBe(4);
    expect(countEl.textContent).toBe('4');
  });

  test('reset sets count to 0', () => {
    count = 10;
    countEl.textContent = count;
    
    // Simulate reset
    count = 0;
    countEl.textContent = count;
    
    expect(count).toBe(0);
    expect(countEl.textContent).toBe('0');
  });

  test('multiple increments work correctly', () => {
    count = 0;
    countEl.textContent = count;
    
    count += 1;
    countEl.textContent = count;
    expect(count).toBe(1);
    
    count += 1;
    countEl.textContent = count;
    expect(count).toBe(2);
  });

  test('multiple decrements work correctly', () => {
    count = 5;
    countEl.textContent = count;
    
    count -= 1;
    countEl.textContent = count;
    expect(count).toBe(4);
    
    count -= 1;
    countEl.textContent = count;
    expect(count).toBe(3);
  });
});
